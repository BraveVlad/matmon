import { Button, StyleSheet, Text, View } from "react-native";

export default function RoomsScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to My Rooms!</Text>
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
