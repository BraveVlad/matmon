import { StyleSheet, View } from "react-native";
import {
	MapPressEvent,
	MapView,
	Marker,
	MarkerDragStartEndEvent,
	PROVIDER_GOOGLE,
} from "../MapView/MapView";
import { useRef } from "react";
import { TreasureCoordinate, Treasures } from "../../models/Treasure.model";
import TreasureOpenImage from "../../assets/images/treasure/treasure-chest-closed.png";
import SearchRadiusCircle from "./SearchRadiusCircle";
import TreasureMarker from "./TreasureMarker";

type TreasureCreationMapViewProps = {
	otherTreasures: Treasures;
	onTreasureCoordinateChange: (coordinate: TreasureCoordinate) => void;
	coordinate: TreasureCoordinate;
	treasureTitle: string;
	searchRadius: number;
};
export default function TreasureCreationMapView({
	otherTreasures,
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
				zoomControlEnabled
				toolbarEnabled={false}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: coordinate.latitude,
					longitude: coordinate.longitude,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
				onPress={handleMapPress}
			>
				{otherTreasures &&
					otherTreasures.map((treasure) => (
						<TreasureMarker key={treasure.id} treasure={treasure} />
					))}
				<SearchRadiusCircle center={coordinate} radius={searchRadius} />
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
