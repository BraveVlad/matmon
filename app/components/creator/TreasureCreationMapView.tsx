import { StyleSheet, View } from "react-native";
import { MapView, Marker, PROVIDER_GOOGLE } from "../MapView/MapView";
import { useRef } from "react";
import { TreasureCoordinate } from "../../models/Treasure.model";

type TreasureCreationMapViewProps = {
	treasureCoordinate: TreasureCoordinate;
	treasureTitle: string;
};
export default function TreasureCreationMapView({
	treasureCoordinate,
	treasureTitle,
}: TreasureCreationMapViewProps) {
	const mapRef = useRef<MapView>(null);

	return (
		<View style={styles.mapContainer}>
			<MapView
				style={styles.map}
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: treasureCoordinate.latitude,
					longitude: treasureCoordinate.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
			>
				<Marker
					draggable
					title={treasureTitle}
					coordinate={{
						latitude: treasureCoordinate.latitude,
						longitude: treasureCoordinate.longitude,
					}}
				/>
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
