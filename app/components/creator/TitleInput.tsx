import GraphemeSplitter from "grapheme-splitter";
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

const graphemeSplitter = new GraphemeSplitter();

export function checkTextValidity(
	title: string,
	minLength: number,
	maxLength: number,
	onValidationFailed?: (error: string) => void
) {
	const trimmedTitle = title.trim();
	const titleLengthIncludingEmojis = graphemeSplitter.countGraphemes(title);

	if (titleLengthIncludingEmojis < minLength) {
		onValidationFailed?.(`can't be less than ${minLength} characters.`);
		return false;
	}

	if (titleLengthIncludingEmojis > maxLength) {
		onValidationFailed?.(`can't be more than ${maxLength} characters.`);
		return false;
	}

	const specialCharactersRegex = /[@$%^*,."`:;{}<>\/\\]/;
	const specialCharactersTestResult = specialCharactersRegex.test(trimmedTitle);

	if (specialCharactersTestResult) {
		// setTitleError("Room title contains invalid characters.");
		onValidationFailed?.("contains invalid characters.");
		return false;
	}

	// onValidationFailed("");
	return true;
}

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
