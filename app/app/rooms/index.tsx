import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import { Rooms } from "../../models/Room.model";

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
	return (
		<View style={styles.container}>
			<Text>Welcome to My Rooms!</Text>
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
