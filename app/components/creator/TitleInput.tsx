import { useState } from "react";
import {
	TextInput,
	View,
	StyleSheet,
	StyleProp,
	ViewStyle,
} from "react-native";

type TitleInputProps = {
	style?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<ViewStyle>;
	title: string;
	placeholder: string;
	isActive?: boolean;
	onTitleChanged: (title: string) => void;
};

export default function TitleInput({
	style,
	textStyle,
	title,
	placeholder,
	onTitleChanged,
	isActive,
}: TitleInputProps) {
	return (
		<View style={[styles.container, style]}>
			<TextInput
				editable={isActive}
				style={[styles.input, textStyle]}
				maxLength={24}
				value={title}
				onChangeText={onTitleChanged}
				placeholder={placeholder}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		width: "100%",
		padding: 8,
		justifyContent: "center",
		alignContent: "center",
	},
	input: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 28,
		fontWeight: "bold",
		borderRadius: 8,
		borderWidth: 2,
		padding: 8,
	},
});
