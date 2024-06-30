import { Router } from "express";
import { NewRoom, Room, Rooms } from "../models/Room.model";

export const router = Router();

type RoomsApiResponse<T> = {
	message: string;
	data?: T;
};

router.get("/check", (request, response) => {
	response.status(200).json({ status: "Rooms router is OK" });
});

router.get("/:user", async (request, response) => {
	const { user } = request.params;
	const apiResponse: RoomsApiResponse<Rooms> = {
		message: "OK",
		data: [],
	};

	try {
		const rooms = await Room.find({ creator: user });

		if (!rooms) {
			apiResponse.message = "Couldn't find rooms.";
			response.status(500);
			response.json(apiResponse);
			return;
		}

		const clientRooms = rooms.map((room) => {
			return {
				id: room._id.toString(),
				title: room.title,
				creationDate: room.creationDate,
				treasures: room.treasures,
				creator: room.creator,
			} as Room;
		});

		apiResponse.data = clientRooms;

		response.status(200);
		response.json(apiResponse);
	} catch (error) {
		console.error(error);
		apiResponse.message = `Couldn't find rooms for ${user}.`;
		response.status(500);
		response.json(apiResponse);
	}
});

router.post("/create", async (request, response) => {
	const { room } = request.body;

	console.log(`Rooms: requested to create room from ip: ${request.ip}`);

	const apiResponse: RoomsApiResponse<Rooms> = {
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

	newRoom.treasures = newRoom.treasures.map((treasure) => {
		return {
			...treasure,
			isFound: false,
		};
	});

	try {
		const roomModel = new Room({
			...newRoom,
		});

		console.log(`Saving room ${roomModel.id} to db`);
		await roomModel.save();

		console.log(`Rooms: User ${newRoom.creator} created a new room`);

		apiResponse.message = "ROOM_CREATED";
		apiResponse.data?.push(newRoom);

		response.status(201);
		return response.json(apiResponse);
	} catch (error) {
		console.error(error);
		apiResponse.message = "Couldn't create room.";
		response.status(400);
		return response.json(apiResponse);
	}
});

router.get("/single/:roomId", async (request, response) => {
	const { roomId } = request.params;
	const apiResponse: RoomsApiResponse<Room> = {
		message: "OK",
		data: undefined,
	};

	try {
		const room = await Room.findById({ _id: roomId });

		if (!room) {
			apiResponse.message = "Couldn't find room.";
			response.status(500);
			response.json(apiResponse);
			return;
		}

		const clientRoom: Room = {
			id: room._id.toString(),
			title: room.title,
			creationDate: room.creationDate,
			treasures: room.treasures,
			creator: room.creator,
		};

		apiResponse.data = clientRoom;

		response.status(200);
		response.json(apiResponse);
	} catch (error) {
		apiResponse.message = `Couldn't find room with id: ${roomId}.`;
		response.status(500);
		response.json(apiResponse);
	}
});
