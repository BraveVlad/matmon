import React, { PropsWithChildren, useEffect, useRef } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { MapView, Marker, PROVIDER_GOOGLE } from "../MapView/MapView";
import { Treasures } from "../../models/Treasure.model";
import TreasureMarker from "./TreasureMarker";
import { LocationObject } from "expo-location";
import useUserLocation from "../../models/useUserLocation";

type TreasuresMapViewProps = PropsWithChildren<{
	treasures: Treasures;
	style?: StyleProp<ViewStyle>;
	showUserLocation?: boolean;
	focusLocation?: LocationObject;
	followUser?: boolean;
}>;

export default function TreasuresMapView({
	style,
	treasures,
	showUserLocation,
	focusLocation,
	followUser,
}: TreasuresMapViewProps) {
	const { userLocation } = useUserLocation();
	const mapRef = useRef<MapView>(null);

	useEffect(() => {
		if (followUser) {
			handleMoveToUser();
		}
	}, [userLocation]);

	function handleMoveToUser() {
		if (!userLocation) return;
		mapRef.current?.animateCamera({
			center: {
				latitude: userLocation?.coords.latitude,
				longitude: userLocation?.coords.longitude,
			},
			heading: 0,
			pitch: 50,
			zoom: 16,
		});
	}

	return (
		<View style={[styles.mapContainer, style]}>
			<MapView
				showsUserLocation={showUserLocation}
				style={styles.map}
				ref={mapRef}
				provider={PROVIDER_GOOGLE}
				initialRegion={{
					latitude: focusLocation ? focusLocation.coords.latitude : 31.771959,
					longitude: focusLocation ? focusLocation.coords.longitude : 35.217018,
					latitudeDelta: 0.1,
					longitudeDelta: 0.1,
				}}
				zoomControlEnabled
				toolbarEnabled={false}
				followsUserLocation={true}
			>
				{treasures.map((treasure) => (
					<TreasureMarker key={treasure.id} treasure={treasure} />
				))}
			</MapView>
		</View>
	);
}

const styles = StyleSheet.create({
	mapContainer: {
		width: "100%",
		height: 300,
	},
	map: {
		flex: 1,
	},
});
