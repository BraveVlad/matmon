import { useState } from "react";
import { StyleSheet, View, Pressable, Text } from "react-native";

type SwitchOption = "left" | "right";

type SwitchViewProps = {
	leftText: string;
	rightText: string;
	onOptionChange: (option: SwitchOption) => void;
};

export default function SwitchView({
	leftText,
	rightText,
	onOptionChange,
}: SwitchViewProps) {
	const [activeOption, setActiveOption] = useState<SwitchOption>("left");

	function onSwitch(side: SwitchOption) {
		setActiveOption(side);
		onOptionChange(side);
	}
	return (
		<View style={styles.switchButton}>
			<SwitchButton
				text={rightText}
				onPress={() => onSwitch("left")}
				isActive={activeOption === "left"}
			/>
			<SwitchButton
				text={rightText}
				onPress={() => onSwitch("right")}
				isActive={activeOption === "right"}
			/>
		</View>
	);
}

type SwitchButtonProps = {
	text: string;
	isActive: boolean;
	onPress: () => void;
};

function SwitchButton({ text, isActive, onPress }: SwitchButtonProps) {
	return (
		<Pressable
			style={[
				styles.switchOption,
				isActive ? styles.switchOptionActive : undefined,
			]}
			onPress={onPress}
		>
			<Text>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
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
