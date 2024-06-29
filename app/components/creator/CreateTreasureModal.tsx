import { useState } from "react";
import { StyleSheet, Button, Modal, View, Text } from "react-native";
import { Treasure, TreasureCoordinate } from "../../models/Treasure.model";
import SearchRadiusPicker from "./SearchRadiusPicker";
import TitleInput from "./TitleInput";
import TreasureCreationMapView from "./TreasureCreationMapView";
import TreasureLootPicker, { Loot } from "./TreasureLootPicker";

type CreateTreasureModalProps = {
	isVisible: boolean;
	onCancelled: () => void;
	onTreasureCreated: (treasure: Treasure) => void;
};
export default function CreateTreasureModal({
	isVisible,
	onCancelled,
	onTreasureCreated,
}: CreateTreasureModalProps) {
	const [treasureTitle, setTreasureTitle] = useState<string>("");
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

	function handleOnCreate() {
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
			<View style={styles.modal}>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Treasure modal title</Text>
				</View>
				<View style={styles.contentContainer}>
					<TreasureCreationMapView
						treasureTitle={treasureTitle}
						coordinate={coordinate}
						searchRadius={searchRadius}
						onTreasureCoordinateChange={handleOnTreasureCoordinateChange}
					/>
					<TitleInput
						title={treasureTitle}
						placeholder="Enter treasure name"
						onTitleChanged={setTreasureTitle}
					/>

					<TreasureLootPicker loot={loot} setLoot={handleOnLootChange} />
					<SearchRadiusPicker
						searchRadius={searchRadius}
						onSearchRadiusChange={handeOnSearchRadiusChange}
					/>
				</View>
				<View style={styles.actions}>
					<Button title="close" onPress={handleOnClose} />
					<Button title="create" onPress={handleOnCreate} />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		backgroundColor: "white",
		padding: 6,
	},
	titleContainer: {},
	title: {},
	contentContainer: {
		flex: 16,
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
});
