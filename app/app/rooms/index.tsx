import { StyleSheet, Text, View } from "react-native";
import RoomsListView from "../../components/RoomsListView";

export default function RoomsScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to My Rooms!</Text>
			<RoomsListView />
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
