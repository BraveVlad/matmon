import { View, Button, StyleSheet } from "react-native";
import { useState } from "react";
import CreateTreasureModal from "./CreateTreasureModal";

export default function CreateTreasureButton() {
	const [isShowTreasureModal, setIsShowTreasureModal] =
		useState<boolean>(false);

	function openCreateTreasureModal() {
		console.log("Open treasure modal.");
		setIsShowTreasureModal(true);
	}

	return (
		<View>
			<Button title="Add Treasure" onPress={openCreateTreasureModal} />
			<CreateTreasureModal
				isVisible={isShowTreasureModal}
				onCancelled={() => {
					setIsShowTreasureModal(false);
				}}
				onTreasureCreated={() => {}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({});
