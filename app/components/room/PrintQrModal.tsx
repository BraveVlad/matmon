import {
	StyleSheet,
	View,
	Button,
	Modal,
	ScrollView,
	Text,
	FlatList,
	ListRenderItemInfo,
} from "react-native";
import { Treasure, Treasures } from "../../models/Treasure.model";
import QRCode from "react-native-qrcode-svg";
import { printAsync } from "expo-print";

type PrintQrModalProps = {
	isVisible: boolean;
	roomId: string;
	roomTitle?: string;
	treasures?: Treasures;
	onClose: () => void;
};
export default function PrintQrModal({
	isVisible,
	roomTitle,
	roomId,
	treasures,
	onClose,
}: PrintQrModalProps) {
	async function generatePDF() {}

	function onPrint() {
		console.log("Printing all QRs");
	}

	function renderQrItem({ item, index }: ListRenderItemInfo<Treasure>) {
		return <TreasureQr key={index} roomId={roomId} treasureId={item.id} />;
	}
	return (
		<Modal style={styles.modal} animationType="slide" visible={isVisible}>
			<Text style={styles.title}>Treasures Of {roomTitle} </Text>
			<FlatList
				contentContainerStyle={styles.qrList}
				data={treasures}
				keyExtractor={(treasure) => treasure.id}
				renderItem={renderQrItem}
				numColumns={2}
			/>

			<View style={styles.actions}>
				<Button title="Close" onPress={onClose} />
				<Button title="Print" onPress={onPrint} />
			</View>
		</Modal>
	);
}
type TreasureQrProps = {
	roomId: string;
	treasureId: string;
};
function TreasureQr({ roomId, treasureId }: TreasureQrProps) {
	return (
		<View style={styles.qrContainer}>
			<Text style={styles.qrLabel}>{treasureId}</Text>
			<QRCode value={`ROOM-${roomId}-TREASURE-${treasureId}`} />
		</View>
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
		gap: 16,
	},
	qrContainer: {
		flex: 0.5,
		alignItems: "center",
	},

	qrLabel: {
		fontWeight: "bold",
		fontSize: 16,
		marginVertical: 6,
	},
});
