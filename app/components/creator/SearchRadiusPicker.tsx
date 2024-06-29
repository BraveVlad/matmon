import Slider, { MarkerProps } from "@react-native-community/slider";
import { useReducer, useRef, useState } from "react";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";

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

export default function SearchRadiusPicker({
	searchRadius,
	onSearchRadiusChange,
}: SearchRadiusPickerPorps) {
	const [sliderValue, setSliderValue] = useState<number>(1);

	const [units, setUnits] = useState<RadiusUnits>(RadiusUnits.meters);
	const [radiusLimits, setRadiusLimits] = useState<RadiusLimits>({
		min: 1,
		max: 1000,
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

	function handleSwitchUnits(newUnits: RadiusUnits) {
		switch (newUnits) {
			case RadiusUnits.meters:
				radiusLimits.max = 1000;
				setRadiusLimits(radiusLimits);
				break;
			case RadiusUnits.kilometers:
				radiusLimits.max = 50;
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
			<Text>Search Radius: {formatSearchRadiusLabel()}</Text>

			<View style={styles.sliderContainer}>
				<Text style={styles.sliderLabel}>{radiusLimits.min}</Text>
				<Slider
					style={styles.slider}
					minimumTrackTintColor="#000000"
					maximumTrackTintColor="#000000"
					minimumValue={1}
					maximumValue={100}
					step={1}
					onValueChange={onSliderValueChange}
				/>
				<Text style={styles.sliderLabel}>{radiusLimits.max}</Text>
			</View>
			<View style={styles.switchButton}>
				<Pressable
					style={[
						styles.switchOption,
						units === RadiusUnits.meters
							? styles.switchOptionActive
							: undefined,
					]}
					onPress={() => handleSwitchUnits(RadiusUnits.meters)}
				>
					<Text>Meters</Text>
				</Pressable>
				<Pressable
					style={[
						styles.switchOption,
						units === RadiusUnits.kilometers
							? styles.switchOptionActive
							: undefined,
					]}
					onPress={() => handleSwitchUnits(RadiusUnits.kilometers)}
				>
					<Text>Kilometers</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
	},
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
	switchButton: {
		flexDirection: "row",
		gap: 16,
	},
	switchOption: {
		justifyContent: "center",
		alignItems: "center",
		aspectRatio: 2 / 1,
		borderWidth: 2,
		borderRadius: 32,
		padding: 8,
		borderColor: "grey",
		backgroundColor: "grey",
	},
	switchOptionActive: {
		backgroundColor: "white",
		borderColor: "green",
		fontWeight: "bold",
	},
});
