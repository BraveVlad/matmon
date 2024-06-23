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

const MOCK_ROOMS: Rooms = [
	{
		id: "1",
		title: "first mock room",
		creationDate: new Date(),
		creator: undefined,
		treasures: [],
	},
	{
		id: "2",
		title: "second mock room",
		creationDate: new Date(),
		creator: undefined,
		treasures: [],
	},
	{
		id: "3",
		title: "third mock room",
		creationDate: new Date(),
		creator: undefined,
		treasures: [],
	},
];

type RoomsApiResponse = {
	message: string;
	data?: Rooms;
};

async function fetchRooms() {
	try {
		const result = await axios.get<RoomsApiResponse>(
			"http://localhost:3000/rooms/all"
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
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["rooms"],
		queryFn: fetchRooms,
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
			keyExtractor={(room) => room.id}
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
