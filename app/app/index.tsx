<<<<<<< HEAD
import { StyleSheet, Text, View } from "react-native";
import React from "react"
=======
import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
>>>>>>> fa0339cd2e9e80de6ec1f82c8bcb36fa94a586f5

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
