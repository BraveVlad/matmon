import {
	FlatList,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Rooms, Room } from "../models/Room.model";

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

export default function RoomsListView() {
	function RenderRoomsListItem({ item }: ListRenderItemInfo<Room>) {
		return <RoomsListViewItem room={item} />;
	}

	return (
		<FlatList
			style={styles.roomsList}
			data={MOCK_ROOMS}
			renderItem={RenderRoomsListItem}
			keyExtractor={(room) => room.id}
		/>
	);
}

type RoomsListViewItemProps = {
	room: Room;
};

function RoomsListViewItem({ room }: RoomsListViewItemProps) {
	return (
		<View style={styles.roomsListItem}>
			<Text>{room.title}</Text>
			<Text>created: {room.creationDate.toLocaleDateString()}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	roomsList: {
		width: "75%",
		gap: 16,
	},
	roomsListItem: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
