import { Button } from "react-native";
import { Treasure } from "../../models/Treasure.model";

type MockTreasureCreateButtonProps = {
	onNewTreasure: (treasure: Treasure) => void;
};

export default function MockTreasureCreateButton({
	onNewTreasure,
}: MockTreasureCreateButtonProps) {
	function generateRandomCoordinateInIsrael() {
		const minLat = 29.5; // Southernmost point of Israel
		const maxLat = 33.3; // Northernmost point of Israel
		const minLon = 34.3; // Westernmost point of Israel
		const maxLon = 35.9; // Easternmost point of Israel

		const latitude = Math.random() * (maxLat - minLat) + minLat;
		const longitude = Math.random() * (maxLon - minLon) + minLon;

		return {
			latitude,
			longitude,
		};
	}

	function generateRandomTreasure(reasureTitle: string): Treasure {
		const id = Math.random().toString(36).substring(2, 9); // Generate a random string id
		const name = "Hidden Treasure"; // Can be modified to generate different names
		const searchRadius = Math.floor(Math.random() * 500) + 50; // Random radius between 50 and 500
		const isFound = false;
		const coordinate = generateRandomCoordinateInIsrael();

		return {
			id,
			name,
			searchRadius,
			isFound,
			coordinate,
		};
	}

	function onGenerateTreasure() {
		const randomTreasure = generateRandomTreasure("Random Generated");
		onNewTreasure(randomTreasure);
	}

	return <Button title="Generate Treasure" onPress={onGenerateTreasure} />;
}
