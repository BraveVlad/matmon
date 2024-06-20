import { Button, StyleSheet, Text, View } from "react-native";

export default function RoomScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to RoomScreen!</Text>
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
