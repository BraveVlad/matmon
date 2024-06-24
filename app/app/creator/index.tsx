import { Button, StyleSheet, View, Text } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";
import { useState } from "react";
import { router } from "expo-router";

export default function CreatorScreen() {
	const [treasures, setTreasures] = useState<Treasures>([]);
	const [roomTitle, setRoomTitle] = useState<string>("");
	const [titleError, setTitleError] = useState<string>("");
	const [treasuresError, setTreasuresError] = useState<string>("");

	console.log(roomTitle);
	function onNewTreasure(newTreasure: Treasure): void {
		setTreasures([...treasures, newTreasure]);
		checkTreasuresValidity();
	}

	function checkTitleValidity() {
		const trimmedTitle = roomTitle.trim();

		if (trimmedTitle.length < 5) {
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

	function checkTreasuresValidity() {
		if (treasures.length === 0) {
			setTreasuresError("Room must contain at least one treasure.");
			return false;
		}
		setTreasuresError("");
		return true;
	}

	function onSaveRoom() {
		const isValidTreasure = checkTreasuresValidity();
		const isValidTitle = checkTitleValidity();

		if (!isValidTreasure || !isValidTitle) {
			return;
		}

		console.log("ok to create room");
	}

	function onExitRoom() {
		router.replace("/rooms");
	}

	function handleTitleChange(roomTitle: string) {
		setRoomTitle(roomTitle);
		checkTitleValidity();
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
			<Text style={styles.errorMessage}>
				{titleError ? "⚠️" : ""}
				{titleError}
			</Text>

			<TreasuresMapView />

			<Text style={styles.errorMessage}>
				{titleError ? "⚠️" : ""}
				{treasuresError}
			</Text>
			<TreasuresListView treasures={treasures} />
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
