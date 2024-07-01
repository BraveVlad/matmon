import {
	Button,
	StyleSheet,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
} from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import TitleInput, {
	checkTextValidity,
} from "../../components/creator/TitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import { useState } from "react";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
	RoomsApiResponse,
	postCreateRoomUri,
} from "../../models/MatmonApi.model";
import CreateTreasureButton from "../../components/creator/CreateTreasureButton";
import { NewRoom, Room } from "../../models/Room.model";
import { styles } from "../styles/styles";

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

	function checkTreasuresValidity(treasures: Treasures) {
		setTreasuresError("");
		if (treasures.length === 0) {
			setTreasuresError("Room must contain at least one treasure.");
			return false;
		}
		return true;
	}

	function checkTitleValidity(title: string) {
		setTitleError("");
		return checkTextValidity(title, 5, 25, (error) => {
			setTitleError(error);
		});
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
		const newTreasureId = treasuresList.length + 1;
		newTreasure.id = `treasure#` + newTreasureId;

		const newTreasuresList = [...treasuresList, newTreasure];

		setTreasuresList(newTreasuresList);
		checkTreasuresValidity(newTreasuresList);
	}

	function handleTitleChange(roomTitle: string) {
		setRoomTitle(roomTitle);
		checkTitleValidity(roomTitle);
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={styles.container}
		>
			<ScrollView contentContainerStyle={styles.scrollView} horizontal={true}>
				<View>
					<View style={styles.actionsBar}>
						<Button title="Exit" onPress={onExitRoom} />
						<Button
							disabled={createRoomMutation.isPending}
							title="Save"
							onPress={onSaveRoom}
						/>
					</View>

					<TitleInput
						title={roomTitle}
						placeholder="Enter room title"
						onTitleChanged={handleTitleChange}
					/>
					{isShowErrors && titleError && (
						<Text style={styles.errorMessage}>⚠️ {titleError}</Text>
					)}
					<TreasuresMapView treasures={treasuresList} />
					{isShowErrors && treasuresError && (
						<Text style={styles.errorMessage}>⚠️ {treasuresError}</Text>
					)}
					<TreasuresListView treasures={treasuresList} />

					<CreateTreasureButton
						otherTreasures={treasuresList}
						onNewTreasure={onNewTreasure}
					/>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
