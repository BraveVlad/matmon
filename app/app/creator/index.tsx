import { Button, StyleSheet, View } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import TreasureCreateModalButton from "../../components/creator/TreasureCreateModalButton";
import { Treasure } from "../../models/Treasure.model";

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

type MockTreasureCreateButtonProps = {
	onNewTreasure: (treasure: Treasure) => void;
};
function MockTreasureCreateButton({
	onNewTreasure,
}: MockTreasureCreateButtonProps) {
	function generateRandomTreasure() {
		return {
			id: "1a2b3c",
			name: "Golden Crown",
			searchRadius: 150,
			isFound: false,
			coordinate: {
				latitude: 34.052235,
				longitude: -118.243683,
			},
		} as Treasure;
	}
	function onGenerateTreasure() {
		const randomTreasure = generateRandomTreasure();
		onNewTreasure(randomTreasure);
	}

	return <Button title="Generate Treasure" onPress={onGenerateTreasure} />;
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
