import { PropsWithChildren, ReactElement, cloneElement, useState } from "react";
import { Button, View } from "react-native";

type ModalWithCloseButton = ReactElement<{
	isVisible: boolean;
	onCloseModal: () => void;
}>;

type ModalButtonProps = {
	title: string;
	modal: ModalWithCloseButton;
	onCloseModal?: () => void;
	onOpenModal?: () => void;
};

export default function ModalButton({
	title,
	modal,
	onCloseModal,
	onOpenModal,
}: ModalButtonProps) {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

	function onOpen() {
		setIsModalVisible(true);
		onOpenModal?.();
	}

	function onClose() {
		setIsModalVisible(false);
		onCloseModal?.();
	}

	return (
		<View>
			<Button title={title} onPress={onOpen} />
			{cloneElement(modal, {
				onCloseModal: onClose,
				isVisible: isModalVisible,
			})}
		</View>
	);
}
