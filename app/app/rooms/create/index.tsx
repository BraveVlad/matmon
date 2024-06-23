import { Link } from "expo-router";
import { useRef } from "react";
import {
	Button,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from "react-native";
import { MapView } from "../../../components/MapView/MapView";

export default function RoomCreationScreen() {
	return (
		<View style={styles.container}>
			<Text>Welcome to Room Creation Screen!</Text>
			<View style={styles.actionsBar}>
				<Button title="Save" />
				<Button title="Start" />
			</View>
			<TreasuresMapView />
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
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	actionsBar: {},
	mapContainer: {
		width: 250,
		height: 250,
	},
});
