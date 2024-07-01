import { useState } from "react";
import {
	StyleSheet,
	Button,
	Modal,
	Text,
	View,
	ScrollView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

import {
	Treasure,
	TreasureCoordinate,
	Treasures,
} from "../../models/Treasure.model";
import SearchRadiusPicker from "./SearchRadiusPicker";
import TitleInput, { checkTextValidity } from "./TitleInput";
import TreasureCreationMapView from "./TreasureCreationMapView";
import TreasureLootPicker, { Loot } from "./TreasureLootPicker";

type CreateTreasureModalProps = {
	otherTreasures: Treasures;
	isVisible: boolean;
	onCancelled: () => void;
	onTreasureCreated: (treasure: Treasure) => void;
};
export default function CreateTreasureModal({
	otherTreasures,
	isVisible,
	onCancelled,
	onTreasureCreated,
}: CreateTreasureModalProps) {
	const [treasureTitle, setTreasureTitle] = useState<string>("");
	const [titleError, setTitleError] = useState<string>("");

	const [coordinate, setCoordinate] = useState<TreasureCoordinate>({
		latitude: 31.771959,
		longitude: 35.217018,
	});
	const [searchRadius, setSearchRadius] = useState<number>(1);
	const [loot, setLoot] = useState<Loot>({
		type: "physical",
		value: "",
	});

	function resetModal() {
		setCoordinate({
			latitude: 31.771959,
			longitude: 35.217018,
		});
		setTreasureTitle("");
		setLoot({
			type: "physical",
			value: "",
		});
	}
	function handleOnClose() {
		resetModal();
		onCancelled();
	}

	function handleOnTreasureCoordinateChange(coordinate: TreasureCoordinate) {
		setCoordinate(coordinate);
	}

	function handeOnSearchRadiusChange(value: number): void {
		setSearchRadius(value);
	}

	function handleOnLootChange(loot: Loot) {
		setLoot(loot);
	}

	function checkTitleValidity(title: string) {
		setTitleError("");
		return checkTextValidity(title, 1, 25, (error) => {
			setTitleError(error);
		});
	}
	function handleOnTitleChange(title: string) {
		setTreasureTitle(title);
		checkTitleValidity(title);
	}

	function handleOnCreate() {
		const isValidTitle = checkTitleValidity(treasureTitle);
		console.log(`valid title: `, isValidTitle);
		if (!isValidTitle) {
			return;
		}

		const newTreasure: Treasure = {
			name: treasureTitle,
			searchRadius: searchRadius,
			coordinate: coordinate,
			id: "",
			isFound: false,
		};

		onTreasureCreated(newTreasure);
		resetModal();
	}

	return (
		<Modal animationType="slide" transparent={true} visible={isVisible}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.modal}
			>
				<ScrollView contentContainerStyle={styles.scrollView}>
					<View style={styles.contentContainer}>
						<TreasureCreationMapView
							otherTreasures={otherTreasures}
							treasureTitle={treasureTitle}
							coordinate={coordinate}
							searchRadius={searchRadius}
							onTreasureCoordinateChange={handleOnTreasureCoordinateChange}
						/>
						<TitleInput
							title={treasureTitle}
							placeholder="New treasure name"
							onTitleChanged={handleOnTitleChange}
						/>
						{titleError && (
							<Text style={styles.errorMessage}>⚠️ {titleError}</Text>
						)}
						<SearchRadiusPicker
							searchRadius={searchRadius}
							onSearchRadiusChange={handeOnSearchRadiusChange}
						/>
						<TreasureLootPicker loot={loot} setLoot={handleOnLootChange} />
					</View>
					<View style={styles.actionsContainer}>
						<View style={styles.actions}>
							<Button title="close" onPress={handleOnClose} />
							<Button title="create" onPress={handleOnCreate} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		// backgroundColor: "white",
		backgroundColor: "#46178f",

		padding: 6,
	},
	scrollView: {
		flexGrow: 1,
	},
	contentContainer: {
		flex: 20,
		justifyContent: "flex-start",
	},
	actionsContainer: {
		flexShrink: 0,
		flexGrow: 0,

		justifyContent: "center",
	},
	actions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	actionButton: {
		textAlign: "center",
	},
	errorMessage: {
		color: "red",
		fontWeight: "bold",
	},
});
