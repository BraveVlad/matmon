import {
	Button,
	FlatList,
	ListRenderItem,
	ListRenderItemInfo,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { Room, Rooms } from "../../models/Room.model";
import { ReactElement, JSXElementConstructor } from "react";

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
export default function RoomsScreen() {
	function RenderRoomsListItem({ item }: ListRenderItemInfo<Room>) {
		return <Text>Mock Room Item: {item.title}</Text>;
	}

	return (
		<View style={styles.container}>
			<Text>Welcome to My Rooms!</Text>
			<FlatList
				data={MOCK_ROOMS}
				renderItem={RenderRoomsListItem}
				keyExtractor={(room) => room.id}
			/>
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
