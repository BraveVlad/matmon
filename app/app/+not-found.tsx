import { router } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<View style={styles.container}>
			<Text>Oopsie Doopsie!</Text>
			<Button title="Go Back" onPress={() => router.replace("/")} />
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
