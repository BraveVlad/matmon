import { StyleSheet, View, Text } from "react-native";
import QRCode from "react-native-qrcode-svg";

type TreasureQrProps = {
	roomId: string;
	treasureId: string;
	treasureName: string;
};
export default function TreasureBarcode({
	roomId,
	treasureId,
	treasureName,
}: TreasureQrProps) {
	return (
		<View>
			<View style={styles.qrTitle}>
				<Text style={styles.qrId}>{treasureId}</Text>
				<Text style={styles.qrName}>{treasureName}</Text>
			</View>
			<QRCode value={`ROOM-${roomId}-TREASURE-${treasureId}`} />
		</View>
	);
}

const styles = StyleSheet.create({
	qrTitle: { marginVertical: 4 },
	qrId: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
	},
	qrName: {
		fontSize: 8,
		textAlign: "center",
	},
});
