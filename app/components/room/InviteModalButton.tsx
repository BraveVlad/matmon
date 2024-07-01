import { useState } from "react";
import { View, Button } from "react-native";
import InviteModal from "./InviteModal";

type InviteModalButton = {
	roomId: string;
	roomTitle?: string;
};

export default function InviteModalButton({
	roomId,
	roomTitle,
}: InviteModalButton) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	function onOpen() {
		setIsModalVisible(true);
	}

	function onClose() {
		setIsModalVisible(false);
	}
	return (
		<View>
			<Button title="Invite" onPress={onOpen} />
			<InviteModal
				isVisible={isModalVisible}
				roomId={roomId}
				roomTitle={roomTitle}
				onClose={onClose}
			/>
		</View>
	);
}
