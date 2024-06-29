import { TreasureCoordinate } from "../../models/Treasure.model";
import { Circle } from "../MapView/MapView";

type SearchRadiusCirclepProps = {
	center: TreasureCoordinate;
	radius: number;
};
export default function SearchRadiusCircle({
	center,
	radius,
}: SearchRadiusCirclepProps) {
	return (
		<Circle
			fillColor="#b3d0ffb0"
			strokeColor="#93bbfa"
			center={{
				latitude: center.latitude,
				longitude: center.longitude,
			}}
			radius={radius}
		/>
	);
}
