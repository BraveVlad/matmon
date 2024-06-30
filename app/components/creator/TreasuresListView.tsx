import {
	ListRenderItemInfo,
	View,
	FlatList,
	Text,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from "react-native";
import { Treasures, Treasure } from "../../models/Treasure.model";

type TreasuresListViewProps = {
	treasures: Treasures;
	style?: StyleProp<ViewStyle>;
};
export default function TreasuresListView({
	treasures,
	style,
}: TreasuresListViewProps) {
	function renderTreasureListItem({
		item,
		index,
	}: ListRenderItemInfo<Treasure>) {
		return (
			<View>
				<Text>
					{index + 1} ) Treasure #{item.id} - {item.name} - Coords:
					{`${item.coordinate.latitude.toFixed(
						3
					)},${item.coordinate.longitude.toFixed(3)}`}
				</Text>
			</View>
		);
	}

	return (
		<View style={[styles.treasuresList, style]}>
			<Text>Treasures List View</Text>
			<FlatList
				data={treasures}
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
