import { router } from "expo-router";
import {
	View,
	Button,
	Text,
	Modal,
	StyleSheet,
	BackHandler,
} from "react-native";
import { Treasure } from "../../models/Treasure.model";
import { useState } from "react";

export default function TreasureCreateModalButton() {
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

type CreateTreasureModalProps = {
	isVisible: boolean;
	onCancelled: () => void;
	onTreasureCreated: (treasure: Treasure) => void;
};

function CreateTreasureModal({
	isVisible,
	onCancelled,
	onTreasureCreated,
}: CreateTreasureModalProps) {
	function handleOnClose() {
		onCancelled();
	}

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<View style={styles.modal}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Treasure modal title</Text>
				</View>
				<View style={styles.contentContainer}></View>
				<View style={styles.actions}>
					<Button title="close" onPress={handleOnClose} />
					<Button title="create" />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		top: "25%",
		height: "75%",
		backgroundColor: "white",
	},
	titleContainer: {},
	title: {},
	contentContainer: {
		flex: 9,
		// height: "50%",
	},
	actions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	actionButton: {},
});
