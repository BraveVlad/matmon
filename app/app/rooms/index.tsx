import { Pressable, StyleSheet, Text, View } from "react-native";
import RoomsListView from "../../components/RoomsListView";
import { router } from "expo-router";

export default function RoomsScreen() {
	function onCreateNewRoom() {
		router.push("/rooms/creator/");
	}

	return (
		<View style={styles.container}>
			<Text>Welcome to My Rooms!</Text>
			<RoomsListView />
			<Pressable onPress={onCreateNewRoom}>
				<Text>Create new room</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
