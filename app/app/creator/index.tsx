import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import tailwind from 'tailwind-rn';
import TreasuresListView from "../../components/creator/TreasuresListView";
import TreasuresMapView from "../../components/creator/TreasuresMapView";
import RoomTitleInput from "../../components/creator/RoomTitleInput";
import MockTreasureCreateButton from "../../components/creator/MockTreasureCreateButton";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { NewRoom, Room } from "../../models/Room.model";
import axios, { AxiosError } from "axios";
import {
  RoomsApiResponse,
  postCreateRoomUri,
} from "../../models/MatmonApi.model";
import GraphemeSplitter from 'grapheme-splitter';


async function createNewRoom(room: NewRoom) {
  const result = await axios.post<RoomsApiResponse<Room>>(postCreateRoomUri(), {
    room: room,
  });

  return result.data;
}

export default function CreatorScreen() {
  const [treasuresList, setTreasuresList] = useState([]);
  const [roomTitle, setRoomTitle] = useState("");

  const [isShowErrors, setIsShowErrors] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [treasuresError, setTreasuresError] = useState("");

  const createRoomMutation = useMutation({
    mutationKey: ["create-room"],
    mutationFn: (room: NewRoom) => createNewRoom(room),
    onSuccess: (data, variables) => {
      console.log("create new room success!");
      console.log("variables:", variables);
      console.log("data:", data);

      router.replace("/rooms/");
    },

    onError: (error) => {
      const axiosError = error as AxiosError<RoomsApiResponse<Room>>;

      if (!axiosError.response) {
        console.error("error:", axiosError.message);
        return;
      }

      const apiResonse = axiosError.response.data;
      console.error("api message:", apiResonse.message);
    },
  });

  const generateUniqueId = () => {
    return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  };

  function checkTitleValidity(title) {
    const trimmedTitle = title.trim();
    const titleLengthIncludingEmojis = new GraphemeSplitter().countGraphemes(title);

    if (titleLengthIncludingEmojis < 5) {
      setTitleError("Room title can't be less than 5 characters.");
      return false;
    }

    const specialCharactersRegex = /[@$%^*,."`:;{}<>\/\\]/;
    const specialCharactersTestResult = specialCharactersRegex.test(trimmedTitle);

    if (specialCharactersTestResult) {
      setTitleError("Room title contains invalid characters.");
      return false;
    }

    setTitleError("");
    return true;
  }

  function checkTreasuresValidity(treasures) {
    if (treasures.length === 0) {
      setTreasuresError("Room must contain at least one treasure.");
      return false;
    }
    setTreasuresError("");
    return true;
  }

  function onSaveRoom() {
    setIsShowErrors(true);
    const isValidTreasure = checkTreasuresValidity(treasuresList);
    const isValidTitle = checkTitleValidity(roomTitle);

    if (!isValidTreasure || !isValidTitle) {
      return;
    }

    console.log("ok to create room");
    const newRoom = {
      _id: generateUniqueId(),
      treasures: treasuresList,
      title: roomTitle,
      creator: "vlad",
    };
    createRoomMutation.mutate(newRoom);
  }

  function onExitRoom() {
    router.replace("/rooms");
  }

  function onNewTreasure(newTreasure) {
    const newTreasuresList = [...treasuresList, newTreasure];
    setTreasuresList(newTreasuresList);
    checkTreasuresValidity(newTreasuresList);
  }

  function handleTitleChange(roomTitle) {
    setRoomTitle(roomTitle);
    checkTitleValidity(roomTitle);
  }

  return (
    <View style={tailwind('p-10 flex-1 bg-white items-center justify-center')}>
      <View style={tailwind('w-3/4 flex-row justify-end gap-4')}>
        <Button title="Exit" onPress={onExitRoom} />
        <Button
          disabled={createRoomMutation.isPending}
          title="Save"
          onPress={onSaveRoom}
        />
      </View>

      <RoomTitleInput
        roomTitle={roomTitle}
        onRoomTitleChanged={handleTitleChange}
      />
      {isShowErrors && (
        <Text style={tailwind('text-red-500 font-bold')}>
          {titleError ? "⚠️" : ""}
          {titleError}
        </Text>
      )}
      <TreasuresMapView treasures={treasuresList} />
      {isShowErrors && (
        <Text style={tailwind('text-red-500 font-bold')}>
          {treasuresError ? "⚠️" : ""}
          {treasuresError}
        </Text>
      )}
      <TreasuresListView treasures={treasuresList} />
      <MockTreasureCreateButton onNewTreasure={onNewTreasure} />
    </View>
  );
}
