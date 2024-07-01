import {
	StyleSheet,
	View,
	Button,
	Modal,
	Text,
	FlatList,
	ListRenderItemInfo,
} from "react-native";
import { Treasure, Treasures } from "../../models/Treasure.model";
import { printAsync, printToFileAsync } from "expo-print";
import { createRef, useEffect, useRef } from "react";
import ViewShot from "react-native-view-shot";
import { encode } from "base64-arraybuffer";
import TreasureBarcode from "./TreasureBarcode";

type PrintQrModalProps = {
	isVisible: boolean;
	roomId: string;
	roomTitle?: string;
	treasures?: Treasures;
	onClose: () => void;
};

type BarcodeSnapshotRef = React.RefObject<ViewShot>;
type BarcodeSnapshotRefs = BarcodeSnapshotRef[];

export default function PrintQrModal({
	isVisible,
	roomTitle,
	roomId,
	treasures,
	onClose,
}: PrintQrModalProps) {
	const barcodeSnapshotRefs = useRef<BarcodeSnapshotRefs>([]);

	useEffect(() => {
		if (!treasures) {
			barcodeSnapshotRefs.current = [];
			return;
		}
		barcodeSnapshotRefs.current = treasures.map(() => createRef<ViewShot>());
	}, [treasures]);

	function formtPdfFile(body: string) {
		return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Printed QR Codes</title>
            <style>
                body {
				padding:0;
				margin:0;
                }
                .page {
                    page-break-after: always;
                }
                .qr-image {
                    width: 90%;
					height: auto;
					margin-left: 5%;
                }
            </style>
        </head>
        <body>
            ${body}
        </body>
        </html>
    `;
	}
	async function generatePdf() {
		const barcodeImages: (string | null)[] = await Promise.all(
			barcodeSnapshotRefs.current.map(async (ref) => {
				if (!ref || !ref.current || typeof ref.current.capture !== "function") {
					console.warn("ref.current is null or undefined");
					return null;
				}

				try {
					const uri = await ref.current.capture();
					return uri;
				} catch (error) {
					console.error("Error capturing QR code:", error);
					return null;
				}
			})
		);
		const filteredBarcodeImages = barcodeImages.filter(
			(uri): uri is string => uri !== null
		);

		const barcodeElements = await Promise.all(
			filteredBarcodeImages.map(async (uri) => {
				try {
					const response = await fetch(uri);
					if (!response.ok) {
						throw new Error(`Failed to fetch ${uri}`);
					}
					const buffer = await response.arrayBuffer();
					const base64Data = encode(buffer);
					return `<div class="page"><img src="data:image/png;base64,${base64Data}" class="qr-image"></div>`;
				} catch (error) {
					console.error(`Error fetching ${uri}:`, error);
					return "";
				}
			})
		).then((data) => data.join(""));

		const pdfContent = formtPdfFile(barcodeElements);

		return pdfContent;
	}

	async function printBarcodesPdf(html: string) {
		try {
			const { uri } = await printToFileAsync({ html });
			console.log("PDF generated:", uri);
			await printAsync({ uri });
		} catch (error) {
			console.error("Error printing PDF:", error);
		}
	}

	async function onPrint() {
		const barcodesHtml = await generatePdf();
		printBarcodesPdf(barcodesHtml);
		onClose();
	}

	function renderBarcodeItem({ item, index }: ListRenderItemInfo<Treasure>) {
		return (
			<View style={styles.qrContainer}>
				<ViewShot
					ref={barcodeSnapshotRefs.current[index]}
					options={{ format: "png", quality: 1.0 }}
				>
					<TreasureBarcode
						key={index}
						roomId={roomId}
						treasureId={item.id}
						treasureName={item.name}
					/>
				</ViewShot>
			</View>
		);
	}

	return (
		<Modal style={styles.modal} animationType="slide" visible={isVisible}>
			<Text style={styles.title}>Treasures Of {roomTitle} </Text>
			<FlatList
				contentContainerStyle={styles.qrList}
				data={treasures}
				keyExtractor={(treasure) => treasure.id}
				renderItem={renderBarcodeItem}
				numColumns={2}
			/>
			<View style={styles.actions}>
				<Button title="Close" onPress={onClose} />
				<Button title="Print" onPress={onPrint} />
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		backgroundColor: "white",
	},
	title: {
		textAlign: "center",
		fontSize: 21,
		fontWeight: "bold",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginVertical: 16,
	},
	qrList: {
		gap: 24,
	},
	qrContainer: {
		flex: 0.5,
		alignItems: "center",
	},
});
