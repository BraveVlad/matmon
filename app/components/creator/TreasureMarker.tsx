import { Marker, MarkerDragStartEndEvent } from "react-native-maps";
import { Treasure } from "../../models/Treasure.model";
import { View } from "react-native";
import SearchRadiusCircle from "./SearchRadiusCircle";
import TreasureOpenImage from "../../assets/images/treasure/treasure-chest-open.png";
import TreasureClosedImage from "../../assets/images/treasure/treasure-chest-closed.png";

type TreasureMarkerProp = {
	treasure: Treasure;
	isDraggable?: boolean;
	onDragEnd?: (event: MarkerDragStartEndEvent) => void;
};
export default function TreasureMarker({
	treasure,
	isDraggable,
	onDragEnd,
}: TreasureMarkerProp) {
	return (
		<View>
			<SearchRadiusCircle
				center={treasure.coordinate}
				radius={treasure.searchRadius}
			/>
			<Marker
				key={treasure.id}
				coordinate={{
					latitude: treasure.coordinate.latitude,
					longitude: treasure.coordinate.longitude,
				}}
				title={treasure.name}
				description={`ID: ${treasure.id}`}
				image={treasure.isFound ? TreasureOpenImage : TreasureClosedImage}
				anchor={{ x: 0.5, y: 0.5 }}
				draggable={isDraggable}
				onDragEnd={onDragEnd}
			/>
		</View>
	);
}
