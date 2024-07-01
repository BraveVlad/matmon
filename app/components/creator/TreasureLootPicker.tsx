import { StyleSheet, View, Text } from "react-native";
import SwitchView, { SwitchOption } from "./SwitchView";
import TitleInput from "./TitleInput";

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
		<View style={[styles.lootContainer]}>
			<Text style={styles.label}>Loot Type: </Text>

			<View style={styles.switch}>
				<SwitchView
					leftText="Physical"
					rightText="Digital"
					onOptionChange={handleLootTypeChange}
				/>
			</View>
			{loot.type === "digital" && (
				<TitleInput
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
		justifyContent: "flex-start",
		gap: 6,
		padding: 16,
	},

	label: {
		color: "white",
		flexShrink: 0,
		fontWeight: "bold",
		fontSize: 18,
	},

	switch: {
		justifyContent: "center",
	},
});
