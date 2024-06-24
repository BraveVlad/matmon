import { router } from "expo-router";
import { Button, StyleSheet, TextInput, View } from "react-native";
import TreasuresListView from "../../../models/creator/TreasuresListView";
import TreasuresMapView from "../../../models/creator/TreasuresMapView";
import RoomTitleInput from "../../../models/creator/RoomTitleInput";

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
