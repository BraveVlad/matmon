import { router } from "expo-router";
import { Pressable, Text, StyleSheet } from "react-native";
import { Room } from "../models/Room.model";

type RoomsListViewItemProps = {
	room: Room;
};

export default function RoomsListViewItem({ room }: RoomsListViewItemProps) {
	function onOpenRoomScreen() {
		router.push(`/rooms/view/${room.id}`);
	}

	return (
		<Pressable
			key={room.id}
			style={styles.roomsListItem}
			onPress={onOpenRoomScreen}
		>
			<Text style={styles.title}>{room.title}</Text>
			{/* <Text>created: {room.creationDate.toLocaleDateString()}</Text> */}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	roomsListItem: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#0693e3",
		width: "100%",
		padding: 16,
		// flex: 1,
		borderRadius: 8,
	},
	title: {
		fontWeight: "bold",
		fontSize: 21,
		textAlign: "center",
		color: "white",
		// backgroundColor: "green",
	},
});
