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
		<Pressable style={styles.roomsListItem} onPress={onOpenRoomScreen}>
			<Text>{room.title}</Text>
			<Text>created: {room.creationDate.toLocaleDateString()}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	roomsListItem: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
});
