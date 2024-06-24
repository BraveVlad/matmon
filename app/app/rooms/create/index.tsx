import { Button, StyleSheet, View } from "react-native";
import TreasuresListView from "../../../models/creator/TreasuresListView";
import TreasuresMapView from "../../../models/creator/TreasuresMapView";
import RoomTitleInput from "../../../models/creator/RoomTitleInput";
import TreasureCreateModalButton from "../../../models/creator/TreasureCreateModalButton";

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
