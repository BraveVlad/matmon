import { View, Button, StyleSheet } from "react-native";
import { useState } from "react";
import CreateTreasureModal from "./CreateTreasureModal";
import { Treasure } from "../../models/Treasure.model";

type CreateTreasureButtonProps = {
	onNewTreasure: (treasure: Treasure) => void;
};
export default function CreateTreasureButton({
	onNewTreasure,
}: CreateTreasureButtonProps) {
	const [isShowTreasureModal, setIsShowTreasureModal] =
		useState<boolean>(false);

	function openCreateTreasureModal() {
		console.log("Open treasure modal.");
		setIsShowTreasureModal(true);
	}

	function onTreasureCreated(treasure: Treasure) {
		setIsShowTreasureModal(false);
		onNewTreasure(treasure);
	}
	return (
		<View>
			<Button title="Add Treasure" onPress={openCreateTreasureModal} />
			<CreateTreasureModal
				isVisible={isShowTreasureModal}
				onCancelled={() => {
					setIsShowTreasureModal(false);
				}}
				onTreasureCreated={onTreasureCreated}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
