import { StyleSheet, View, Button, Modal, Text } from "react-native";

type PrintQrModalProps = {
	isVisible: boolean;
	roomId: string;
	roomTitle?: string;
	onClose: () => void;
};

export default function PrintQrModal({
	isVisible,
	roomTitle,
	roomId,
	onClose,
}: PrintQrModalProps) {
	return (
		<Modal style={styles.modal} animationType="slide" visible={isVisible}>
			<Text style={styles.title}>Invite </Text>

			<View style={styles.actions}>
				<Button title="Close" onPress={onClose} />
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
});
