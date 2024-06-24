import { Button, StyleSheet, View } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";
import { useState } from "react";

export default function CreatorScreen() {
	const [treasures, setTreasures] = useState<Treasures>([]);
	console.log(treasures);

	function onNewTreasure(newTreasure: Treasure): void {
		console.log(`new treasure: ${newTreasure.name} generated.`);
		setTreasures([...treasures, newTreasure]);
	}

	return (
		<View style={styles.container}>
			<View style={styles.actionsBar}>
				<Button title="Save" />
				<Button title="Start" />
			</View>
			<RoomTitleInput />
			<TreasuresMapView />
			<TreasuresListView treasures={treasures} />
			{/* <TreasureCreateModalButton /> */}
			<MockTreasureCreateButton onNewTreasure={onNewTreasure} />
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
});
