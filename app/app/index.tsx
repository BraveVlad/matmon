import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Matmon app!</Text>
			<View style={styles.actions}>
				<Button title="JOIN" onPress={() => router.push("/game")} />
				<Button title="CREATE" onPress={() => router.push("/rooms")} />
			</View>
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
	actions: {
		flexDirection: "row",
		gap: 16,
	},
});
