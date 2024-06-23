import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { Rooms, Room } from "../models/Room.model";
import RoomsListViewItem from "./RoomsListViewItem";
import { useQuery } from "@tanstack/react-query";

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

function fetchRooms() {
	return MOCK_ROOMS;
}

export default function RoomsListView() {
	const roomsQuery = useQuery({
		queryKey: ["rooms"],
		queryFn: fetchRooms,
	});

	function RenderRoomsListItem({ item }: ListRenderItemInfo<Room>) {
		return <RoomsListViewItem room={item} />;
	}

	return (
		<FlatList
			style={styles.roomsList}
			data={roomsQuery.data}
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
});
