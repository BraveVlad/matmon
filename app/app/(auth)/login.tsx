import { Button, StyleSheet, Text, View } from "react-native";

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to login screen!</Text>
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
