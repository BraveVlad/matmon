import { Pressable, StyleSheet, Text, View } from "react-native";
import RoomsListView from "../../components/RoomsListView";
import { router } from "expo-router";

export default function RoomsScreen() {
	function onCreateNewRoom() {
		router.push("/creator/");
	}

	return (
		<View style={styles.container}>
			<View style={styles.list}>
				<RoomsListView />
			</View>

			<Pressable style={styles.shareButton} onPress={onCreateNewRoom}>
				<Text style={styles.shareButtonText}>Create new room</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		backgroundColor: "#46178F",

		alignItems: "center",
		justifyContent: "center",
		padding: 16,
	},
	list: {
		flex: 1,
		width: "100%",
		// backgroundColor: "red",
	},
	shareButton: {
		// alignSelf: "flex-end",
		backgroundColor: "#0693e3",
		margin: 32,
	},
	shareButtonText: {
		fontSize: 21,
		margin: 16,
		color: "white",
		fontWeight: "bold",
	},
});
