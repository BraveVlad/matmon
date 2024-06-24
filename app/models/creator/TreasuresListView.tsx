import {
	ListRenderItemInfo,
	View,
	FlatList,
	Text,
	StyleSheet,
} from "react-native";
import { Treasures, Treasure } from "../Treasure.model";

export default function TreasuresListView() {
	const MOCK_TREASURES: Treasures = [
		{
			id: "1a2b3c",
			name: "Golden Crown",
			searchRadius: 150,
			isFound: false,
			coordinate: {
				latitude: 34.052235,
				longitude: -118.243683,
			},
		},
		{
			id: "4d5e6f",
			name: "Ancient Amulet",
			searchRadius: 200,
			isFound: true,
			coordinate: {
				latitude: 40.712776,
				longitude: -74.005974,
			},
		},
		{
			id: "7g8h9i",
			name: "Pirate's Chest",
			searchRadius: 300,
			isFound: false,
			coordinate: {
				latitude: 25.761681,
				longitude: -80.191788,
			},
		},
	];

	function renderTreasureListItem({
		item,
		index,
	}: ListRenderItemInfo<Treasure>) {
		return (
			<View>
				<Text>
					{index} ) Treasure # {item.name}
				</Text>
			</View>
		);
	}

	return (
		<View style={styles.treasuresList}>
			<Text>Treasures List View</Text>
			<FlatList
				data={MOCK_TREASURES}
				keyExtractor={(treasure) => treasure.id}
				renderItem={renderTreasureListItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	treasuresList: {
		flex: 1,
	},
});
