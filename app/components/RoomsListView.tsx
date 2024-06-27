import {
	FlatList,
	ListRenderItemInfo,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Rooms, Room } from "../models/Room.model";
import RoomsListViewItem from "./RoomsListViewItem";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { RoomsApiResponse, getAllRoomsUri } from "../models/MatmonApi.model";

async function fetchRooms(username: string) {
	try {
		const result = await axios.get<RoomsApiResponse<Rooms>>(
			getAllRoomsUri(username)
		);
		const response = result.data;

		if (!response || !response.data) {
			throw new Error("Unable to resolve response or it's data.");
		}

		if (response.message !== "OK") {
			throw new Error(response.message);
		}

		const rooms = response.data.map((room) => ({
			...room,
			creationDate: new Date(room.creationDate),
		}));
		return rooms;
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error(
			"Error occured while fetching all rooms:",
			axiosError.message
		);

		throw axiosError;
	}
}

export default function RoomsListView() {
	const username: string = "vlad";
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["rooms", username],
		queryFn: ({ queryKey }) => {
			const [_, username] = queryKey;
			return fetchRooms(username);
		},
	});

	function RenderRoomsListItem({ item }: ListRenderItemInfo<Room>) {
		return <RoomsListViewItem room={item} />;
	}

	if (isLoading) {
		return <Text>Loading rooms...</Text>;
	}

	if (isError) {
		return (
			<Pressable style={styles.errorMessage} onPress={() => refetch()}>
				<Text>Oopsie! unable to fetch rooms!</Text>
				<Text>Click here to reload 🔄️</Text>
			</Pressable>
		);
	}

	return (
		<FlatList
			style={styles.roomsList}
			data={data}
			renderItem={RenderRoomsListItem}
			keyExtractor={(room) => room._id}
		/>
	);
}

const styles = StyleSheet.create({
	roomsList: {
		width: "75%",
		gap: 16,
	},
	errorMessage: {
		alignItems: "center",
	},
});
