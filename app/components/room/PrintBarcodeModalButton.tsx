import { useState } from "react";
import { View, Button, Modal } from "react-native";
import PrintQrModal from "./PrintBarcodeModal";
import { Treasures } from "../../models/Treasure.model";

type ModalButtonProps = {
	roomId: string;
	roomTitle?: string;
	treasures?: Treasures;
};

export default function PrintQrModalButton({
	roomId,
	roomTitle,
	treasures,
}: ModalButtonProps) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	function onOpen() {
		setIsModalVisible(true);
	}

	function onClose() {
		setIsModalVisible(false);
	}
	return (
		<View>
			<Button title="Print QR" onPress={onOpen} />
			<PrintQrModal
				isVisible={isModalVisible}
				roomId={roomId}
				roomTitle={roomTitle}
				treasures={treasures}
				onClose={onClose}
			/>
		</View>
	);
}
