import { router } from "expo-router";
import { View, Button } from "react-native";

export default function TreasureCreateModalButton() {
	return (
		<View>
			<Button
				title="Add Treasure"
<<<<<<< HEAD
				onPress={() => router.push("/creator/treasure")}
=======
				onPress={() => router.push("/rooms/create/treasure")}
>>>>>>> 5f5e26f69291f2ed692d37d359d423fe636d4713
			/>
		</View>
	);
}
