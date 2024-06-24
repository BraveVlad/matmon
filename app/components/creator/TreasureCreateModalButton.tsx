import { router } from "expo-router";
import { View, Button, useState, Modal, Google } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function TreasureCreateModalButton() {

	return (
	<View>
		<Modal> 
			<MapView
			provider={PROVIDER_GOOGLE} 
			style={styles.map}
			initialRegion={{
			latitude: 37.78825,
			longitude: -122.4324,
			latitudeDelta: 0.0922,
			longitudeDelta: 0.0421,
			}}
			/> 

			<div class="grid-container">
        		<input type="text" placeholder="Enter text here">
        		<button>Submit</button>
  			</div>

		</Modal>
	</View>
	);
}

const styles = StyleSheet.create({
	grid-container {
		display: grid;
		grid-template-columns: auto auto;
		align-items: center; \
		gap: 10px; 
	},

	map: {
		...StyleSheet.absoluteFillObject,
	},
});

