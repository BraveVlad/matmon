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
import { isYieldExpression } from "typescript";

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
			<View style={styles.listItem}>
				<Text style={styles.title}>
					{item.id} - {item.name}
				</Text>
			</View>
		);
	}

	return (
		<View style={[styles.treasuresList, style]}>
			<Text style={styles.title}>Treasures:</Text>
			<FlatList
				data={treasures}
				keyExtractor={(treasure) => treasure.id}
				renderItem={renderTreasureListItem}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	// treasuresList: {
	// 	flex: 1,
	// },
	// treasuresList: {
	// 	flex: 1,
	// 	width: "100%",
	// 	// backgroundColor: "red",
	// },
	treasuresList: {
		flex: 1,
		padding: 6,
		alignSelf: "center",
		width: "75%",
		gap: 16,
	},
	shareButton: {
		// alignSelf: "flex-end",
		backgroundColor: "#0693e3",
		// margin: 32,
	},
	shareButtonText: {
		fontSize: 21,
		// margin: 16,
		color: "white",
		fontWeight: "bold",
	},
	listItem: {
		flexDirection: "row",
		justifyContent: "center",
		backgroundColor: "#0693e3",
		width: "100%",
		padding: 16,
		// gap: 16,
		marginVertical: 4,

		// flex: 1,
		borderRadius: 8,
	},
	title: {
		fontWeight: "bold",
		fontSize: 16,
		textAlign: "center",
		color: "white",
		// backgroundColor: "green",
	},
});
