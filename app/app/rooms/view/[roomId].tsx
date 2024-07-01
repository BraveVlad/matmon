import { useMutation, useQuery } from "@tanstack/react-query";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";
import { Room } from "../../../models/Room.model";
import {
	RoomsApiResponse,
	deleteRoomUri,
	getSingleRoomUri,
} from "../../../models/MatmonApi.model";
import axios, { AxiosError } from "axios";
import TreasuresMapView from "../../../components/creator/TreasuresMapView";
import TreasuresListView from "../../../components/creator/TreasuresListView";
import PrintQrModalButton from "../../../components/room/PrintBarcodeModalButton";
import InviteModalButton from "../../../components/room/InviteModalButton";

async function fetchRoom(roomId: string) {
	try {
		const result = await axios.get<RoomsApiResponse<Room>>(
			getSingleRoomUri(roomId)
		);
		const response = result.data;

		if (!response || !response.data) {
			throw new Error("Unable to resolve response or it's data.");
		}

		if (response.message !== "OK") {
			throw new Error(response.message);
		}

		const room: Room = {
			...response.data,
			creationDate: new Date(response.data.creationDate),
		};
		return room;
	} catch (error) {
		const axiosError = error as AxiosError;
		console.error("Error occured while fetching room.", axiosError.message);

		throw axiosError;
	}
}

async function deleteRoom(roomId: string) {
	const result = await axios.post<RoomsApiResponse<string>>(deleteRoomUri(), {
		roomId,
	});

	return result.data;
}

export default function RoomViewScreen() {
	const { roomId } = useLocalSearchParams<{ roomId: string }>();
	if (!roomId) return <Redirect href={"/rooms/"} />;

	const { data, isSuccess, isLoading, isError, error } = useQuery({
		queryKey: ["room", roomId],
		queryFn: ({ queryKey }) => {
			const [_, roomId] = queryKey;
			return fetchRoom(roomId);
		},
	});

	const deleteRoomMutation = useMutation({
		mutationKey: ["delete-room", roomId],
		mutationFn: (roomId: string) => deleteRoom(roomId),
		onSuccess: (data, variables) => {
			console.log(`delete room ${roomId} success!`);
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

	function onJoin() {
		router.navigate(`/game/${data?.shareId}`);
	}

	function isActionBarActive() {
		return data ? "auto" : "none";
	}

	function onDeleteRoom() {
		if (!roomId) {
			return;
		}

		deleteRoomMutation.mutate(roomId);
	}

	return (
		<View style={styles.container}>
			<View style={styles.actionBar} pointerEvents={isActionBarActive()}>
				<Button title="Delete" onPress={onDeleteRoom} />

				<PrintQrModalButton
					roomId={roomId}
					roomTitle={data?.title}
					treasures={data?.treasures}
				/>
				<Button onPress={onJoin} title="Play" />
				<InviteModalButton roomId={data?.shareId} roomTitle={data?.title} />
			</View>
			{isLoading && <Text>loading room...</Text>}
			{isError && <Text>Error: {error.toString()}</Text>}
			{isSuccess && (
				<View>
					<Text style={styles.title}>{data.title}</Text>
					<Text>Created at: {data.creationDate.toLocaleDateString()}</Text>
				</View>
			)}
			<TreasuresMapView treasures={data ? data.treasures : []} />
			<TreasuresListView
				style={styles.treasures}
				treasures={data ? data.treasures : []}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		backgroundColor: "#46178F",

		alignItems: "center",
		justifyContent: "flex-start",
	},
	actionBar: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 16,
		marginVertical: 16,
	},
	actionButton: {
		flex: 1,
	},
	title: {
		color: "white",
		fontSize: 32,
		fontWeight: "bold",
	},
	treasures: {
		padding: 8,
	},
});
