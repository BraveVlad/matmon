import React, { PropsWithChildren, useRef } from "react";
import { View, StyleSheet } from "react-native";
import { MapView, Marker, PROVIDER_GOOGLE } from "../MapView/MapView";
import { Treasures } from "../../models/Treasure.model";
import TreasureMarker from "./TreasureMarker";

type TreasuresMapViewProps = PropsWithChildren<{
	treasures: Treasures;
}>;

export default function TreasuresMapView({ treasures }: TreasuresMapViewProps) {
	const mapRef = useRef<MapView>(null);

	return (
		<View style={styles.mapContainer}>
			<MapView
				style={styles.map}
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: 31.771959,
					longitude: 35.217018,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
				zoomControlEnabled
				toolbarEnabled={false}
			>
				{treasures.map((treasure) => (
					<TreasureMarker key={treasure.id} treasure={treasure} />
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	mapContainer: {
		width: "100%",
		height: 300,
	},
	map: {
		flex: 1,
	},
});
