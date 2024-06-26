import React, { PropsWithChildren, useRef } from "react";
import { View, StyleSheet } from "react-native";
import {MapView, Marker, PROVIDER_GOOGLE } from "../MapView/MapView";
import TreasuresListViewProps from "./TreasuresListView";
import { Treasure, Treasures } from "../../models/Treasure.model";

type TreasuresMapViewProps = PropsWithChildren<{
    treasures: Treasures;
}>;

export default function TreasuresMapView({ treasures }: TreasuresMapViewProps) {
    const mapRef = useRef<MapView>(null);

    return (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude:0,//treasures[0]?.coordinate.latitude || 0,
                    longitude:0,//</View>treasures[0]?.coordinate.longitude || 0,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }}
            >
                {treasures.map((treasure) => (
                    <Marker
                        key={treasure.id}
                        coordinate={{
                            latitude: treasure.coordinate.latitude,
                            longitude: treasure.coordinate.longitude,
                        }}
                        title={treasure.name}
                        description={`ID: ${treasure.id}`}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
		height: 300,
    },
    map: {
        flex: 1,
    },
});
