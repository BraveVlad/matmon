import Slider, { MarkerProps } from "@react-native-community/slider";
import { useRef } from "react";
import { StyleSheet, View, Text } from "react-native";

type SearchRadiusPickerPorps = {
	minSearchRadius: number;
	maxSearchRadius: number;
	onSearchRadiusChange: (value: number) => void;
};

export default function SearchRadiusPicker({
	minSearchRadius,
	maxSearchRadius,
	onSearchRadiusChange,
}: SearchRadiusPickerPorps) {
	function handleOnValueChange(value: number): void {
		onSearchRadiusChange(value);
	}

	return (
		<View style={styles.sliderContainer}>
			<Text style={styles.sliderLabel}>{minSearchRadius}</Text>
			<Slider
				style={styles.slider}
				minimumTrackTintColor="#000000"
				maximumTrackTintColor="#000000"
				minimumValue={minSearchRadius}
				maximumValue={maxSearchRadius}
				step={1}
				onValueChange={handleOnValueChange}
			/>
			<Text style={styles.sliderLabel}>{maxSearchRadius}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	sliderContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
	},
	slider: {
		width: "50%",
	},
	sliderLabel: {
		fontSize: 18,
	},
});
