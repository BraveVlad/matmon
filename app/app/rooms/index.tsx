import { Pressable, StyleSheet, Text, View } from "react-native";
import RoomsListView from "../../components/RoomsListView";
import { router } from "expo-router";
import { styles } from "../styles/styles";

export default function RoomsScreen() {
	function onCreateNewRoom() {
		router.push("/creator/");
	}

	return (
		<View style={styles.container}>
			<Text>Welcome to My Rooms!</Text>
			<RoomsListView />
			<Pressable onPress={onCreateNewRoom}>
				<Text>Create new room</Text>
			</Pressable>
		</View>
	);
}


