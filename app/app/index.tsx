import { router } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import ButtonView from "../components/Button/ButtonView";

export default function App() {
	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={styles.title}>Welcome!</Text>
				<View style={styles.actions}>
					<ButtonView text="JOIN" onPress={() => router.push("/game")} />

					<ButtonView text="CREATE" onPress={() => router.push("/rooms")} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#46178f",
	},
	main: {
		alignItems: "center",
		marginBottom: "25%",
	},
	title: {
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
});
