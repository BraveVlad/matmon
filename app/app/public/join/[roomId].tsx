import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function PublicJoinScreen() {
	const { roomId } = useLocalSearchParams<{ roomId: string }>();

	function openApp() {
		window.location.href = `matmon://rooms/view/${roomId}`;
	}
	function openStore() {
		window.location.href = `https://play.google.com/store/apps/details?id=com.matmon.app`;
	}

	useEffect(() => {
		openApp();
	}, []);

	return (
		<View>
			<Text>Join room {roomId} on Matmon!</Text>
			<Button title="Open Matmon App" onPress={openApp} />
			<Button title="Download Matmon App" onPress={openStore} />
		</View>
	);
}
