import { Link, router } from "expo-router";
import { useRef, useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import TreasuresListView from "../../../models/creator/TreasuresListView";
import TreasuresMapView from "../../../models/creator/TreasuresMapView";

export default function RoomCreationScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.actionsBar}>
				<Button title="Save" />
				<Button title="Start" />
			</View>
			<RoomTitleInput />
			<TreasuresMapView />
			<TreasuresListView />
			<TreasureCreateModalButton />
		</View>
	);
}

function TreasureCreateModalButton() {
	return (
		<View>
			<Button
				title="Add Treasure"
				onPress={() => router.push("/rooms/create/treasure")}
			/>
		</View>
	);
}

function RoomTitleInput() {
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
	container: {
		marginTop: "10%",
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	actionsBar: {
		width: "75%",
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},

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
