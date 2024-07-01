import { StyleSheet, View, Button, Modal, Text, Pressable } from "react-native";
import { Share } from "react-native";
import QRCode from "react-native-qrcode-svg";
import TreasureOpenImage from "../../assets/images/treasure/treasure-chest-open.png";

type PrintQrModalProps = {
	isVisible: boolean;
	roomId: string;
	roomTitle?: string;
	onClose: () => void;
};

export default function InviteModal({
	isVisible,
	roomTitle,
	roomId,
	onClose,
}: PrintQrModalProps) {
	async function ShareLink(title: string, content: string) {
		try {
			await Share.share(
				{
					message: `${title}\n${content}`,
				},
				{
					dialogTitle: "Matmon - מטמון",
				}
			);
		} catch (error) {
			console.error(`Unable to share.`, error);
		}
	}

	function formtPublicInviteLink() {
		return `https://matmon.onrender.com/public/join/${roomId}`;
	}

	function onShare() {
		ShareLink(
			"*Matmon - מטמון*",
			`I'm inviting you to hunt for treasures in my room: ${roomTitle}\n\n*Click here to join* 👉\n${formtPublicInviteLink()}`
		);
	}

	return (
		<Modal
			style={styles.modal}
			animationType="fade"
			visible={isVisible}
			transparent={true}
		>
			<Pressable style={styles.background} onPress={onClose}></Pressable>

			<View style={styles.content}>
				<Text style={styles.title}>Invite players to join</Text>
				<Text style={[styles.title, styles.name]}>{roomTitle}</Text>
				<View style={styles.barcode}>
					<QRCode
						size={200}
						value={formtPublicInviteLink()}
						logo={TreasureOpenImage}
					/>
				</View>

				<Pressable style={styles.shareButton} onPress={onShare}>
					<Text style={styles.shareButtonText}>Share room link</Text>
				</Pressable>

				<View style={styles.actions}>
					<Button title="Close" onPress={onClose} />
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
		top: "12.5%",
		left: "12.5%",
		height: "75%",
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
	name: {
		fontSize: 32,
		fontWeight: "bold",
	},
	barcode: {
		marginVertical: 32,
	},
	shareButton: {
		backgroundColor: "#0693e3",
	},
	shareButtonText: {
		fontSize: 21,
		margin: 16,
		color: "white",
		fontWeight: "bold",
	},
	actions: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginVertical: 16,
	},
});
