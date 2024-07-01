import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import TitleInput from "../../components/creator/TitleInput";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Room } from "../../models/Room.model";
import {
	GameApiResponse,
	RoomsApiResponse,
	getGameUri,
} from "../../models/MatmonApi.model";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

async function fetchGame(gamePin: string) {
	try {
		const result = await axios.get<GameApiResponse<Room>>(getGameUri(gamePin));
		const response = result.data;

		if (!response || !response.data) {
			throw new Error("Unable to resolve response or it's data.");
		}

		if (response.message !== "OK") {
			throw new Error(response.message);
		}

		const room: Room = {
			...response.data,
			creationDate: new Date(response.data.creationDate),
		};
		return room;
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error("Error occured while fetching room.", axiosError.message);

		throw axiosError;
	}
}
export default function JoinGameScreen() {
	const [gamePin, setGamePin] = useState<string>("");
	const [joinError, setJoinError] = useState<string>("");

	const { refetch } = useQuery({
		queryKey: ["game", gamePin],
		queryFn: ({ queryKey }) => {
			const [_, gamePin] = queryKey;
			return fetchGame(gamePin);
		},
		enabled: false,
		retry: 1,
	});

	function onGamePinChanged(title: string) {
		setGamePin(title);
		setJoinError("");
	}

	function onJoin() {
		refetch().then((data) => {
			if (!data.data || data.data.shareId !== gamePin) {
				setJoinError("Game not found.");
				setGamePin("");
				return;
			}

			router.replace(`/game/${gamePin}`);
		});
	}

	return (
		<View style={styles.container}>
			<TitleInput
				style={[styles.joinView, styles.gamepin]}
				maxLength={4}
				title={gamePin}
				placeholder={"GAME PIN"}
				onTitleChanged={onGamePinChanged}
			/>
			<Pressable onPress={onJoin} style={[styles.joinView, styles.joinButton]}>
				<Text style={[styles.joinView, styles.joinButtonText]}>JOIN</Text>
			</Pressable>
			{joinError !== "" && <Text style={styles.errorMessage}>{joinError}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#46178f",
		alignItems: "center",
		justifyContent: "center",
		gap: 6,
	},

	joinView: { width: "75%", padding: 0 },
	gamepin: {},
	joinButton: {
		alignSelf: "center",
	},
	joinButtonText: {
		width: "100%",
		backgroundColor: "#0693e3",
		color: "white",
		textAlign: "center",
		fontSize: 28,
		fontWeight: "bold",
		borderRadius: 8,
		// borderWidth: 2,
		padding: 8,
	},
	errorMessage: {
		color: "red",
		fontWeight: "bold",
	},
});
