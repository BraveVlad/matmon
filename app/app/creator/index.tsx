import { Button, StyleSheet, View, Text } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";
import { useState } from "react";
import { router } from "expo-router";
import GraphemeSplitter from "grapheme-splitter";

const graphemeSplitter = new GraphemeSplitter();

export default function CreatorScreen() {
	const [treasuresList, setTreasuresList] = useState<Treasures>([]);
	const [roomTitle, setRoomTitle] = useState<string>("");

	const [isShowErrors, setIsShowErrors] = useState<boolean>(false);
	const [titleError, setTitleError] = useState<string>("");
	const [treasuresError, setTreasuresError] = useState<string>("");

	function checkTitleValidity(title: string) {
		const trimmedTitle = title.trim();
		const titleLengthIncludingEmojis = graphemeSplitter.countGraphemes(title);

		if (titleLengthIncludingEmojis < 5) {
			setTitleError("Room title can't be less than 5 characters.");
			return false;
		}

		const specialCharactersRegex = /[@$%^*,."`:;{}<>\/\\]/;
		const specialCharactersTestResult =
			specialCharactersRegex.test(trimmedTitle);

		if (specialCharactersTestResult) {
			setTitleError("Room title contains invalid characters.");
			return false;
		}

		setTitleError("");
		return true;
	}

	function checkTreasuresValidity(treasures: Treasures) {
		if (treasures.length === 0) {
			setTreasuresError("Room must contain at least one treasure.");
			return false;
		}
		setTreasuresError("");
		return true;
	}

	function onSaveRoom() {
		setIsShowErrors(true);
		const isValidTreasure = checkTreasuresValidity(treasuresList);
		const isValidTitle = checkTitleValidity(roomTitle);

		if (!isValidTreasure || !isValidTitle) {
			return;
		}

		console.log("ok to create room");
	}

	function onExitRoom() {
		router.replace("/rooms");
	}

	function onNewTreasure(newTreasure: Treasure): void {
		const newTreasuresList = [...treasuresList, newTreasure];
		setTreasuresList(newTreasuresList);
		checkTreasuresValidity(newTreasuresList);
	}

	function handleTitleChange(roomTitle: string) {
		setRoomTitle(roomTitle);
		checkTitleValidity(roomTitle);
	}

	return (
		<View style={styles.container}>
			<View style={styles.actionsBar}>
				<Button title="Exit" onPress={onExitRoom} />
				<Button title="Save" onPress={onSaveRoom} />
			</View>

			<RoomTitleInput
				roomTitle={roomTitle}
				onRoomTitleChanged={handleTitleChange}
			/>
			{isShowErrors && (
				<Text style={styles.errorMessage}>
					{titleError ? "⚠️" : ""}
					{titleError}
				</Text>
			)}
			<TreasuresMapView />
			{isShowErrors && (
				<Text style={styles.errorMessage}>
					{treasuresError ? "⚠️" : ""}
					{treasuresError}
				</Text>
			)}
			<TreasuresListView treasures={treasuresList} />
			{/* <TreasureCreateModalButton /> */}
			<MockTreasureCreateButton onNewTreasure={onNewTreasure} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: "10%",
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	actionsBar: {
		width: "75%",
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},
	errorMessage: {
		color: "red",
		fontWeight: "bold",
	},
});
