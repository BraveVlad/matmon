import { View, StyleSheet } from "react-native";
import { MapView } from "../MapView/MapView";
import { useRef } from "react";

export default function TreasuresMapView() {
	const mapRef = useRef<MapView>(null);

	return (
		<View style={styles.mapContainer}>
			<MapView ref={mapRef} />
		</View>
	);
}
const styles = StyleSheet.create({
	mapContainer: {
		flex: 1,
	},
});
