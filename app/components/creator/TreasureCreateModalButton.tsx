import { router } from "expo-router";
import { View, Button } from "react-native";

export default function TreasureCreateModalButton() {
	return (
		<View>
			<Button
				title="Add Treasure"
				onPress={() => router.push("/rooms/create/treasure")}
			/>
		</View>
	);
}
