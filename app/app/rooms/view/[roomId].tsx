import { useQuery } from "@tanstack/react-query";
import { Redirect, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { Room } from "../../../models/Room.model";
import {
	RoomsApiResponse,
	getSingleRoomUri,
} from "../../../models/MatmonApi.model";
import axios, { AxiosError } from "axios";

async function fetchRoom(roomId: string) {
	try {
		const result = await axios.get<RoomsApiResponse<Room>>(
			getSingleRoomUri(roomId)
		);
		const response = result.data;

		if (!response || !response.data) {
			throw new Error("Unable to resolve response or it's data.");
		}

		if (response.message !== "OK") {
			throw new Error(response.message);
		}

		const room = response.data;
		return room;
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error("Error occured while fetching room.", axiosError.message);

		throw axiosError;
	}
}

export default function RoomViewScreen() {
	// Get room id from search params
	const { roomId } = useLocalSearchParams<{ roomId: string }>();
	if (!roomId) return <Redirect href={"/rooms/"} />;

	// get room data via query
	const { data, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: ["room", roomId],
		queryFn: ({ queryKey }) => {
			const [_, roomId] = queryKey;
			return fetchRoom(roomId);
		},
	});

	// show room title, map retrieved treasures.

	// set buttons to act upon: delete, print treasure qr, start, share modal
	return (
		<View style={styles.container}>
			<Text>Welcome to Room View Screen!</Text>
			{isLoading && <Text>loading room...</Text>}
			{isError && <Text>Error: {error.toString()}</Text>}
			{isSuccess && <Text>Room: {data.title}</Text>}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
