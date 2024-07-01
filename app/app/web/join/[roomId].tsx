import { Redirect, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function PublicJoinScreen() {
	const { shareId } = useLocalSearchParams<{ shareId: string }>();

	function openApp() {
		window.location.href = `matmon://game/${shareId}`;
	}
	function openStore() {
		window.location.href = `https://play.google.com/store/apps/details?id=com.matmon.app`;
	}

	useEffect(() => {
		openApp();
	}, []);

	return (
		<View>
			<Text>Join room {shareId} on Matmon!</Text>
			<Button title="Open Matmon App" onPress={openApp} />
			<Button title="Download Matmon App" onPress={openStore} />
		</View>
	);
}
