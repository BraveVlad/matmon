import { Router } from "express";
import { MOCK_ROOMS } from "../data/rooms.Mock";
import { NewRoom, Room, Rooms } from "../models/Room.model";

export const router = Router();

type RoomsApiResponse = {
	message: string;
	data?: Rooms;
};

router.get("/check", (request, response) => {
	response.status(200).json({ status: "Rooms router is OK" });
});

router.get("/all", (_, response) => {
	const rooms = MOCK_ROOMS;

	const apiResponse: RoomsApiResponse = {
		message: "OK",
		data: [],
	};

	if (!rooms) {
		apiResponse.message = "Couldn't find rooms.";
		response.status(500);
		response.json(apiResponse);
		return;
	}

	// if (rooms.length === 0) {
	// 	apiResponse.message = "NO_ROOMS_FOUND";
	// 	response.status(200);
	// 	response.json(apiResponse);
	// 	return;
	// }

	apiResponse.data = rooms;

	response.status(200);
	response.json(apiResponse);
});

router.post("/create", (request, response) => {
	const { room } = request.body;

	console.log(`Rooms: requested to create room from ip: ${request.ip}`);

	const apiResponse: RoomsApiResponse = {
		message: "OK",
		data: [],
	};

	if (!room) {
		apiResponse.message = "INVALID_PARAMS";

		console.error(
			`Rooms: room creation request failed with error: ${apiResponse.message}`
		);

		response.status(400);
		return response.json(apiResponse);
	}

	const newRoom: Room = {
		...(room as NewRoom),
		id: "room test",
		creationDate: new Date(),
	};

	if (!newRoom.treasures || !newRoom.treasures.length) {
		apiResponse.message = "NO_EMPTY_ROOMS";

		console.error(
			`Rooms: room creation request failed with error: ${apiResponse.message}`
		);

		response.status(400);
		return response.json(apiResponse);
	}

	newRoom.treasures = newRoom.treasures.map((treasure, index) => {
		return {
			...treasure,
			id: `treasure#${index}`,
			isFound: false,
		};
	});

	MOCK_ROOMS.push(newRoom);

	console.log(`Rooms: User ${newRoom.creator} created a new room:`, newRoom);

	apiResponse.message = "ROOM_CREATED";
	apiResponse.data?.push(newRoom);

	response.status(201);
	return response.json(apiResponse);
});
