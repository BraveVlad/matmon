import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

export default function RoomTitleInput() {
	const [roomTitle, setRoomTitle] = useState<string>("");

	return (
		<View style={styles.roomTitleInputContainer}>
			<TextInput
				editable
				style={styles.roomTitleInput}
				maxLength={24}
				value={roomTitle}
				onChangeText={setRoomTitle}
				placeholder="Enter room title"
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	roomTitleInputContainer: {
		width: "80%",
		padding: 16,
		justifyContent: "center",
		alignContent: "center",
	},
	roomTitleInput: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 28,
		fontWeight: "bold",
		borderRadius: 8,
		borderWidth: 2,
		padding: 16,
	},
});
