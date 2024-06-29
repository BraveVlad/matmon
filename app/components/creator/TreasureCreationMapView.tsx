import { StyleSheet, View } from "react-native";
import {
	MapPressEvent,
	MapView,
	Marker,
	Circle,
	MarkerDragStartEndEvent,
	PROVIDER_GOOGLE,
} from "../MapView/MapView";
import { useRef } from "react";
import { TreasureCoordinate } from "../../models/Treasure.model";
import TreasureOpenImage from "../../assets/images/treasure/treasure-chest-closed.png";

type TreasureCreationMapViewProps = {
	onTreasureCoordinateChange: (coordinate: TreasureCoordinate) => void;
	coordinate: TreasureCoordinate;
	treasureTitle: string;
	searchRadius: number;
};
export default function TreasureCreationMapView({
	onTreasureCoordinateChange,
	coordinate,
	treasureTitle,
	searchRadius,
}: TreasureCreationMapViewProps) {
	const mapRef = useRef<MapView>(null);

	function setCoordinate(coordinate: TreasureCoordinate) {
		onTreasureCoordinateChange(coordinate);
	}

	function handleOnDragEnd(event: MarkerDragStartEndEvent): void {
		saveCoordinate(event);
	}

	function handleMapPress(event: MapPressEvent): void {
		saveCoordinate(event);
	}

	function saveCoordinate(event: MapPressEvent | MarkerDragStartEndEvent) {
		event.persist();
		const coordinate = event.nativeEvent.coordinate;
		setCoordinate(coordinate);
		moveCamera(coordinate);
	}

	function moveCamera(coordinate: TreasureCoordinate) {
		mapRef.current?.animateCamera({ center: coordinate });
	}

	return (
		<View style={styles.mapContainer}>
			<MapView
				showsUserLocation
				showsIndoors
				style={styles.map}
				ref={mapRef}
				toolbarEnabled={false}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: coordinate.latitude,
					longitude: coordinate.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
				onPress={handleMapPress}
				zoomControlEnabled
			>
				<Circle
					fillColor="#b3d0ffb0"
					strokeColor="#93bbfa"
					center={{
						latitude: coordinate.latitude,
						longitude: coordinate.longitude,
					}}
					radius={searchRadius}
				/>
				<Marker
					draggable
					title={treasureTitle}
					coordinate={{
						latitude: coordinate.latitude,
						longitude: coordinate.longitude,
					}}
					anchor={{ x: 0.5, y: 0.5 }}
					onDragEnd={handleOnDragEnd}
					image={TreasureOpenImage}
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
