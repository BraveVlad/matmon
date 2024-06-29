import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SwitchView, { SwitchOption } from "./SwitchView";
import Slider from "@react-native-community/slider";

type SearchRadiusPickerPorps = {
	searchRadius: number;
	onSearchRadiusChange: (value: number) => void;
};

enum RadiusUnits {
	meters = 1,
	kilometers = 1000,
}

type RadiusLimits = {
	min: number;
	max: number;
};

const MIN_METERS_RADIUS = 1;
const MAX_METERS_RADIUS = 100;
const MAX_KM_RADIUS = 2;
const MIN_KM_RADIUS = 0.1;

export default function SearchRadiusPicker({
	searchRadius,
	onSearchRadiusChange,
}: SearchRadiusPickerPorps) {
	const [sliderValue, setSliderValue] = useState<number>(1);

	const [units, setUnits] = useState<RadiusUnits>(RadiusUnits.meters);
	const [radiusLimits, setRadiusLimits] = useState<RadiusLimits>({
		min: 1,
		max: MAX_METERS_RADIUS,
	});

	function normalizeSearchRadius(sliderValue: number) {
		return (
			((sliderValue - 1) / (100 - 1)) * (radiusLimits.max - radiusLimits.min) +
			radiusLimits.min
		);
	}
	function handleOnValueChange(newSliderValue: number, newUnits?: RadiusUnits) {
		const normalizedSearchRadius = normalizeSearchRadius(newSliderValue);
		const unitsToMultiplyWith = newUnits ? newUnits : units;
		const multipliedByChosenUnitsSearchRadius =
			normalizedSearchRadius * unitsToMultiplyWith;
		onSearchRadiusChange(multipliedByChosenUnitsSearchRadius);
	}

	function onSliderValueChange(newSliderValue: number) {
		setSliderValue(newSliderValue);
		handleOnValueChange(newSliderValue);
	}

	function handleSwitchUnits(option: SwitchOption) {
		const newUnits: RadiusUnits =
			option === "left" ? RadiusUnits.meters : RadiusUnits.kilometers;

		switch (newUnits) {
			case RadiusUnits.meters:
				radiusLimits.min = MIN_METERS_RADIUS;
				radiusLimits.max = MAX_METERS_RADIUS;
				setRadiusLimits(radiusLimits);
				break;
			case RadiusUnits.kilometers:
				radiusLimits.min = MIN_KM_RADIUS;
				radiusLimits.max = MAX_KM_RADIUS;
				setRadiusLimits(radiusLimits);
				break;
		}
		setUnits(newUnits);
		handleOnValueChange(sliderValue, newUnits);
	}

	function formatSearchRadiusLabel() {
		const decimalPoint = units.toString().length - 1;
		const unitName = RadiusUnits[units];
		return `${(searchRadius / units).toFixed(decimalPoint)} ${unitName}`;
	}

	return (
		<View style={styles.container}>
			<Text>
				Search Radius:{" "}
				<Text style={styles.searchRadiusValueLabel}>
					{formatSearchRadiusLabel()}
				</Text>
			</Text>

			<View style={styles.sliderContainer}>
				<Text style={styles.sliderLabel}>{radiusLimits.min}</Text>
				<Slider
					style={styles.slider}
					minimumTrackTintColor="#000000"
					maximumTrackTintColor="#000000"
					minimumValue={1}
					maximumValue={100}
					step={0.1}
					onValueChange={onSliderValueChange}
				/>
				<Text style={styles.sliderLabel}>{radiusLimits.max}</Text>
			</View>

			<SwitchView
				leftText="Meters"
				rightText="Kilometers"
				onOptionChange={handleSwitchUnits}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexGrow: 0,
		marginVertical: 6,
		alignItems: "center",
		justifyContent: "center",
	},
	searchRadiusValueLabel: {
		fontSize: 18,
		fontWeight: "bold",
	},
	sliderContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
	},
	slider: {
		width: "75%",
	},
	sliderLabel: {
		fontSize: 18,
	},
});
