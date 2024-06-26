import { Button, StyleSheet, View, Text } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";
import { useState } from "react";
import { router } from "expo-router";
import GraphemeSplitter from "grapheme-splitter";
import { useMutation } from "@tanstack/react-query";
import { NewRoom, Room } from "../../models/Room.model";
import axios, { AxiosError } from "axios";
import {
	RoomsApiResponse,
	postCreateRoomUri,
} from "../../models/MatmonApi.model";

const graphemeSplitter = new GraphemeSplitter();

async function createNewRoom(room: NewRoom) {
	const result = await axios.post<RoomsApiResponse<Room>>(postCreateRoomUri(), {
		room: room,
	});

	return result.data;
}

export default function CreatorScreen() {
	const [treasuresList, setTreasuresList] = useState<Treasures>([]);
	const [roomTitle, setRoomTitle] = useState<string>("");

	const [isShowErrors, setIsShowErrors] = useState<boolean>(false);
	const [titleError, setTitleError] = useState<string>("");
	const [treasuresError, setTreasuresError] = useState<string>("");

	const createRoomMutation = useMutation({
		mutationKey: ["create-room"],
		mutationFn: (room: NewRoom) => createNewRoom(room),
		onSuccess: (data, variables) => {
			console.log("create new room success!");
			console.log("variables:", variables);
			console.log("data:", data);

			router.replace("/rooms/");
		},

		onError: (error) => {
			const axiosError = error as AxiosError<RoomsApiResponse<Room>>;

			if (!axiosError.response) {
				console.error("error:", axiosError.message);
				return;
			}

			const apiResonse = axiosError.response.data;
			console.error("api message:", apiResonse.message);
		},
	});

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
		const newRoom: NewRoom = {
			treasures: treasuresList,
			title: roomTitle,
			creator: "vlad",
		};
		createRoomMutation.mutate(newRoom);
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
				<Button
					disabled={createRoomMutation.isPending}
					title="Save"
					onPress={onSaveRoom}
				/>
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
