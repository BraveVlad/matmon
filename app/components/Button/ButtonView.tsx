import {
	StyleSheet,
	Pressable,
	Text,
	StyleProp,
	ViewStyle,
	TextStyle,
	PressableProps,
} from "react-native";

type ButtonViewProps = {
	text?: string;
	onPress?: () => void;
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
	pressableProps?: PressableProps;
};
export default function ButtonView({
	text,
	onPress,
	style,
	textStyle,
	pressableProps,
}: ButtonViewProps) {
	return (
		<Pressable
			style={[styles.button, style]}
			onPress={onPress}
			{...pressableProps}
		>
			<Text style={[styles.buttonText, textStyle]}>{text}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#0693e3",
		borderRadius: 8,
		justifyContent: "center",
	},
	buttonText: {
		textAlign: "center",
		fontWeight: "bold",
		color: "white",
		fontSize: 21,
		marginVertical: 8,
		marginHorizontal: 16,
	},
});
