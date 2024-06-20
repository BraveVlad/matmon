import { Button, StyleSheet, Text, View } from "react-native";

export default function RoomCreationScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Room Creation Screen!</Text>
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
