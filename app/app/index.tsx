import { router } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Welcome!</Text>
				<View style={styles.actions}>
					<Pressable style={styles.button} onPress={() => router.push("/game")}>
						<Text style={styles.buttonText}>JOIN</Text>
					</Pressable>
					<Pressable
						style={styles.button}
						onPress={() => router.push("/rooms")}
					>
						<Text style={styles.buttonText}>CREATE</Text>
					</Pressable>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#46178f",
	},
	main: {
		alignItems: "center",
		marginBottom: "25%",
	},
	title: {
		// flex: 1,
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 32,
		color: "white",
		marginVertical: 16,
	},
	actions: {
		flexDirection: "row",
		gap: 16,
	},
	button: {
		alignSelf: "center",
	},
	buttonText: {
		// marginHorizontal: 16,
		width: "100%",
		backgroundColor: "#0693e3",
		color: "white",
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		borderRadius: 8,
		// borderWidth: 2,
		padding: 8,
	},
});
