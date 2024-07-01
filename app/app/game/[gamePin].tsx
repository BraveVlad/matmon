import axios, { AxiosError } from "axios";
import { Button, StyleSheet, Text, View } from "react-native";
import { GameApiResponse, getGameUri } from "../../models/MatmonApi.model";
import { Room } from "../../models/Room.model";
import { useQuery } from "@tanstack/react-query";
import { Redirect, useLocalSearchParams } from "expo-router";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import useUserLocation from "../../models/useUserLocation";

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

export default function GameScreen() {
	const { gamePin } = useLocalSearchParams<{ gamePin: string }>();
	if (!gamePin) return <Redirect href={"/game/join"} />;
	console.log(gamePin);
	const {
		data: room,
		isSuccess,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["game", gamePin],
		queryFn: ({ queryKey }) => {
			const [_, gamePin] = queryKey;
			return fetchGame(gamePin);
		},
		retry: 3,
	});
	const { userLocation } = useUserLocation();

	// function handleMoveToUser() {
	// 	if (!location) return;
	// 	mapRef.current?.animateCamera({
	// 		center: {
	// 			latitude: location?.coords.latitude,
	// 			longitude: location?.coords.longitude,
	// 		},
	// 		heading: 0,
	// 		pitch: 90,
	// 		zoom: 20,
	// 	});
	// }

	if (isError) {
		return <Redirect href={"/game/join"} />;
	}

	if (isLoading) {
		return (
			<View>
				<Text>Loading game...</Text>
			</View>
		);
	}

	if (isSuccess) {
		return (
			<View style={styles.container}>
				<View style={styles.titleBar}>
					<Text style={styles.title}>{room.title}</Text>
				</View>

				<TreasuresMapView
					focusLocation={userLocation}
					showUserLocation={true}
					style={styles.map}
					treasures={room.treasures}
					followUser
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	titleBar: {
		padding: 6,
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
	},

	map: {
		flex: 1,
	},
});
