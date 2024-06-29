import { StyleSheet, View, Text, TextInput } from "react-native";
import SwitchView, { SwitchOption } from "./SwitchView";
import TitleInput from "./TitleInput";
import { useState } from "react";

export type LootType = "physical" | "digital";

export type Loot = {
	type: LootType;
	value: string;
};

type TreasureLootInputProps = {
	loot: Loot;
	setLoot: (loot: Loot) => void;
};

export default function TreasureLootPicker({
	loot,
	setLoot,
}: TreasureLootInputProps) {
	function handleLootTypeChange(option: SwitchOption) {
		const newLoot: Loot = {
			...loot,
			type: option === "left" ? "physical" : "digital",
		};
		setLoot(newLoot);
	}

	function onDigitalLootChange(title: string) {
		const newLoot: Loot = {
			...loot,
			value: title,
		};
		setLoot(newLoot);
	}

	return (
		<View
			style={[
				styles.lootContainer,
				loot.type === "physical" ? styles.collapsedContainer : undefined,
			]}
		>
			{/* <Text style={styles.title}>Loot Type: </Text> */}
			<View style={styles.switch}>
				<SwitchView
					leftText="Physical"
					rightText="Digital"
					onOptionChange={handleLootTypeChange}
				/>
			</View>
			{loot.type === "digital" && (
				<TitleInput
					style={styles.title}
					title={loot.value}
					placeholder="Enter Digital Prize"
					onTitleChanged={onDigitalLootChange}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	lootContainer: {
		flex: 1,
		alignItems: "center",
		padding: 16,
	},
	collapsedContainer: {
		flex: 0.5,
	},
	title: {},
	switch: {
		justifyContent: "center",
	},
});
