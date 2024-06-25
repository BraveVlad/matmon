import { View, StyleSheet } from "react-native";
import { MapView, PROVIDER_GOOGLE } from "../MapView/MapView";
import { useRef } from "react";

export default function TreasuresMapView() {
	const mapRef = useRef<MapView>(null);

	return (
		<View style={styles.mapContainer}>
			<MapView ref={mapRef} provider={PROVIDER_GOOGLE} />
		</View>
	);
}
const styles = StyleSheet.create({
	mapContainer: {
		flex: 1,
	},
});
