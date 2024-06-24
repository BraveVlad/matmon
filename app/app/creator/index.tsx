import { Button, StyleSheet, View } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure } from "../../models/Treasure.model";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";

export default function CreatorScreen() {
	function onNewTreasure(treasure: Treasure): void {
		console.log(`new treasure: ${treasure.name} generated.`);
	}

	return (
		<View style={styles.container}>
			<View style={styles.actionsBar}>
				<Button title="Save" />
				<Button title="Start" />
			</View>
			<RoomTitleInput />
			<TreasuresMapView />
			<TreasuresListView />
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
