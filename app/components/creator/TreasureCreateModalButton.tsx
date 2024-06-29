import { View, Button, Text, Modal, StyleSheet, TextInput } from "react-native";
import { Treasure, TreasureCoordinate } from "../../models/Treasure.model";
import { useState } from "react";
import TreasureCreationMapView from "./TreasureCreationMapView";
import RoomTitleInput from "./RoomTitleInput";
import SearchRadiusPicker from "./SearchRadiusPicker";

export default function TreasureCreateModalButton() {
	const [isShowTreasureModal, setIsShowTreasureModal] =
		useState<boolean>(false);

	function openCreateTreasureModal() {
		console.log("Open treasure modal.");
		setIsShowTreasureModal(true);
	}

	return (
		<View>
			<Button title="Add Treasure" onPress={openCreateTreasureModal} />
			<CreateTreasureModal
				isVisible={isShowTreasureModal}
				onCancelled={() => {
					setIsShowTreasureModal(false);
				}}
				onTreasureCreated={() => {}}
			/>
		</View>
	);
}

type CreateTreasureModalProps = {
	isVisible: boolean;
	onCancelled: () => void;
	onTreasureCreated: (treasure: Treasure) => void;
};

function CreateTreasureModal({
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

	function handleOnClose() {
		onCancelled();
	}

	function handleOnTreasureCoordinateChange(coordinate: TreasureCoordinate) {
		setCoordinate(coordinate);
	}

	function handeOnSearchRadiusChange(value: number): void {
		setSearchRadius(value);
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
					<RoomTitleInput
						roomTitle={treasureTitle}
						onRoomTitleChanged={setTreasureTitle}
					/>
					{/* <View>
						<Text>Location:</Text>
						<View>
							<TextInput
								editable={false}
								value={coordinate.latitude.toString()}
							/>
							<TextInput
								editable={false}
								value={coordinate.longitude.toString()}
							/>
						</View>
					</View> */}
					<View>
						<View>
							<SearchRadiusPicker
								searchRadius={searchRadius}
								onSearchRadiusChange={handeOnSearchRadiusChange}
							/>
						</View>
					</View>
				</View>
				<View style={styles.actions}>
					<Button title="close" onPress={handleOnClose} />
					<Button title="create" />
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modal: {
		// top: "25%",
		// height: "75%",
		flex: 1,
		backgroundColor: "white",
	},
	titleContainer: {},
	title: {},
	contentContainer: {
		flex: 9,
	},
	actions: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	actionButton: {},
});
