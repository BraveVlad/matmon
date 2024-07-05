import { StyleSheet, Modal, Text, View, Button, Pressable } from "react-native";
import ButtonView from "../Button/ButtonView";

type ScanTreasureModalProps = {
	isVisible?: boolean;
	onCloseModal?: () => void;
};

export default function ScanTreasureModal({
	isVisible,
	onCloseModal,
}: ScanTreasureModalProps) {
	return (
		<Modal
			style={styles.modal}
			animationType="fade"
			visible={isVisible}
			transparent={true}
		>
			<Pressable style={styles.background} onPress={onCloseModal}></Pressable>

			<View style={styles.content}>
				<Text style={styles.title}>Invite players to join</Text>

				<View style={styles.actions}>
					<Button title="Close" onPress={onCloseModal} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {},
	background: {
		flex: 1,
		backgroundColor: "#000000d0",
	},
	content: {
		position: "absolute",
		top: "25%",
		left: "12.5%",
		height: "50%",
		width: "75%",
		backgroundColor: "white",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	title: {
		textAlign: "center",
		fontSize: 24,
	},

	actions: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginVertical: 16,
	},
});
