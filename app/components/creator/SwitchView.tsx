import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Pressable,
	Text,
	StyleProp,
	ViewStyle,
} from "react-native";

export type SwitchOption = "left" | "right";

type SwitchViewProps = {
	leftText: string;
	rightText: string;
	style?: StyleProp<ViewStyle>;
	buttonStyle?: StyleProp<ViewStyle>;
	activeButtonStyle?: StyleProp<ViewStyle>;

	onOptionChange: (option: SwitchOption) => void;
};

export default function SwitchView({
	leftText,
	rightText,
	style,
	buttonStyle,
	activeButtonStyle,
	onOptionChange,
}: SwitchViewProps) {
	const [activeOption, setActiveOption] = useState<SwitchOption>("left");

	useEffect(() => {
		onSwitch("left");
	}, []);

	function onSwitch(side: SwitchOption) {
		setActiveOption(side);
		onOptionChange(side);
	}

	return (
		<View style={[style, styles.switch]}>
			<SwitchButton
				text={leftText}
				style={buttonStyle}
				activeStyle={activeButtonStyle}
				onPress={() => onSwitch("left")}
				isActive={activeOption === "left"}
			/>
			<SwitchButton
				text={rightText}
				style={buttonStyle}
				activeStyle={activeButtonStyle}
				onPress={() => onSwitch("right")}
				isActive={activeOption === "right"}
			/>
		</View>
	);
}

type SwitchButtonProps = {
	text: string;
	isActive: boolean;
	style: StyleProp<ViewStyle>;
	activeStyle: StyleProp<ViewStyle>;
	onPress: () => void;
};

function SwitchButton({
	text,
	isActive,
	style,
	activeStyle,
	onPress,
}: SwitchButtonProps) {
	return (
		<Pressable
			style={[
				styles.switchButton,
				style,
				isActive
					? activeStyle
						? activeStyle
						: styles.switchButtonActive
					: undefined,
			]}
			onPress={onPress}
		>
			<Text>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	switch: {
		flexDirection: "row",
		gap: 16,
	},
	switchButton: {
		justifyContent: "center",
		alignItems: "center",
		aspectRatio: 2 / 1,
		borderWidth: 2,
		borderRadius: 32,
		padding: 8,
		borderColor: "grey",
		backgroundColor: "grey",
	},
	switchButtonActive: {
		backgroundColor: "white",
		borderColor: "green",
		fontWeight: "bold",
	},
});
