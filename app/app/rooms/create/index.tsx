import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
	Button,
	FlatList,
	ListRenderItemInfo,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import { MapView } from "../../../components/MapView/MapView";
import { Treasure, Treasures } from "../../../models/Treasure.model";

export default function RoomCreationScreen() {
	return (
		<View style={styles.container}>
			<View style={styles.actionsBar}>
				<Button title="Save" />
				<Button title="Start" />
			</View>
			<RoomTitleInput />
			<TreasuresMapView />
			<TreasuresListView />
		</View>
	);
}

function RoomTitleInput() {
	const [roomTitle, setRoomTitle] = useState<string>("");

	return (
		<View style={styles.roomTitleInputContainer}>
			<TextInput
				editable
				style={styles.roomTitleInput}
				maxLength={24}
				value={roomTitle}
				onChangeText={setRoomTitle}
				placeholder="Enter room title"
			/>
		</View>
	);
}
function TreasuresListView() {
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

function TreasuresMapView() {
	const mapRef = useRef<MapView>(null);

	return (
		<View style={styles.mapContainer}>
			<MapView ref={mapRef} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: "10%",
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	actionsBar: {
		width: "75%",
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},
	mapContainer: {
		flex: 1,
	},
	treasuresList: {
		flex: 1,
	},
	roomTitleInputContainer: {
		width: "80%",
		padding: 16,
		justifyContent: "center",
		alignContent: "center",
	},
	roomTitleInput: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 28,
		fontWeight: "bold",
		borderRadius: 8,
		borderWidth: 2,
		padding: 16,
	},
});
