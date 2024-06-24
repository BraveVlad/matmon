import { forwardRef } from "react";
import { View, Text } from "react-native";
import { MapViewProps } from "react-native-maps";

const MapView = forwardRef((props: MapViewProps, ref) => {
	return (
		<View>
			<Text>Web MapView version still not implemented</Text>
		</View>
	);
});

export { MapView };
