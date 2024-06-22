import { FlatList, ListRenderItemInfo, Text } from "react-native";
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
		return <Text>Mock Room Item: {item.title}</Text>;
	}
	return (
		<FlatList
			data={MOCK_ROOMS}
			renderItem={RenderRoomsListItem}
			keyExtractor={(room) => room.id}
		/>
	);
}
