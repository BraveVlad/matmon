import { Button, StyleSheet, Text, View } from "react-native";
import React from "React";

export default function RoomCreationScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Matmon!</Text>
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Button className="joinButton" onClick="">Join</Button>
				<Button className="createButton" onClick="">Create</Button>
			</div>
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
