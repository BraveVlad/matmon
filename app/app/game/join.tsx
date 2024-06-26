import { Button, StyleSheet, Text, View } from "react-native";

export default function JoinGameScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Join Game Screen</Text>
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
