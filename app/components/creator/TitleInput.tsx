import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

type TitleInputProps = {
	title: string;
	placeholder: string;
	onTitleChanged: (title: string) => void;
};

export default function TitleInput({
	title,
	placeholder,
	onTitleChanged,
}: TitleInputProps) {
	return (
		<View style={styles.roomTitleInputContainer}>
			<TextInput
				editable
				style={styles.roomTitleInput}
				maxLength={24}
				value={title}
				onChangeText={onTitleChanged}
				placeholder={placeholder}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	roomTitleInputContainer: {
		width: "100%",
		padding: 16,
		justifyContent: "center",
		alignContent: "center",
	},
	roomTitleInput: {
		textAlign: "center",
		textAlignVertical: "center",
		fontSize: 28,
		fontWeight: "bold",
		borderRadius: 8,
		borderWidth: 2,
		padding: 16,
	},
});
