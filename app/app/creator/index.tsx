import { Button, StyleSheet, View } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";
import { useState } from "react";
import { router } from "expo-router";

export default function CreatorScreen() {
	const [treasures, setTreasures] = useState<Treasures>([]);
	const [roomTitle, setRoomTitle] = useState<string>("");

	function onNewTreasure(newTreasure: Treasure): void {
		setTreasures([...treasures, newTreasure]);
	}

	function onSaveRoom() {
		// Validate treasures
		console.log(`Treasures list length: `, treasures.length);
		// Validate title
		console.log(`Room title: `, roomTitle);

		// Mutate.
	}

	function onExitRoom() {
		router.replace("/rooms");
	}

	return (
		<View style={styles.container}>
			<View style={styles.actionsBar}>
				<Button title="Exit" onPress={onExitRoom} />
				<Button title="Save" onPress={onSaveRoom} />
			</View>

			<RoomTitleInput roomTitle={roomTitle} onRoomTitleChanged={setRoomTitle} />

			<TreasuresMapView />
			<TreasuresListView treasures={treasures} />
			{/* <TreasureCreateModalButton /> */}
			<MockTreasureCreateButton onNewTreasure={onNewTreasure} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: "10%",
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
});
