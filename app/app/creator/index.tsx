import React from "react";
import { Button, StyleSheet, View } from "react-native";
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import { Treasure, Treasures } from "../../models/Treasure.model";
import { router } from "expo-router";
import GraphemeSplitter from "grapheme-splitter";
import { useMutation } from "@tanstack/react-query";
import { NewRoom, Room } from "../../models/Room.model";
import axios, { AxiosError } from "axios";
import {
	RoomsApiResponse,
	postCreateRoomUri,
} from "../../models/MatmonApi.model";
import TreasureCreateModalButton from "../../components/creator/TreasureCreateModalButton";

const graphemeSplitter = new GraphemeSplitter();

async function createNewRoom(room: NewRoom) {
	const result = await axios.post<RoomsApiResponse<Room>>(postCreateRoomUri(), {
		room: room,
	});

	return result.data;
}

export default function CreatorScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.actionsBar}>
        <Button title="Save" onPress={() => console.log("Save pressed")} />
        <Button title="Start" onPress={() => console.log("Start pressed")} />
      </View>
      <RoomTitleInput roomTitle={""} onRoomTitleChanged={function (roomTitle: string): void {
			  throw new Error("Function not implemented.");
		  } } />
      <TreasuresMapView />
      <TreasuresListView treasures={[]} />
      <TreasureCreateModalButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: "10%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  actionsBar: {
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
