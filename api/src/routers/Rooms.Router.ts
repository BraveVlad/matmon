import { Router } from "express";
import { NewRoom, Room, Rooms } from "../models/Room.model";
import ShortUniqueId from "short-unique-id";

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

	const idGenerator = new ShortUniqueId({ length: 4 });
	const newShareId = idGenerator.rnd();

	const newRoom: Room = {
		...(room as NewRoom),
		shareId: newShareId,
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
			shareId: room.shareId,
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

router.post("/delete", async (request, response) => {
	const { roomId } = request.body;

	console.log(`Room: requested to delete room from ip: ${request.ip}`);

	const apiResponse: RoomsApiResponse<string> = {
		message: "OK",
		data: "",
	};

	if (!roomId) {
		apiResponse.message = "INVALID_PARAMS";

		console.error(
			`Rooms: room deletion request failed with error: ${apiResponse.message}`
		);

		response.status(400);
		return response.json(apiResponse);
	}

	try {
		console.log(`Deleteing room ${roomId} from db`);
		const deletedRoom = await Room.findByIdAndDelete({ _id: roomId });

		if (!deletedRoom) {
			apiResponse.message = "Couldn't find target room .";
			response.status(404);
			response.json(apiResponse);
			return;
		}

		console.log(`Rooms: deleted room ${deletedRoom._id}`);

		apiResponse.message = "OK";
		apiResponse.data = roomId;

		response.status(200);
		return response.json(apiResponse);
	} catch (error) {
		console.error(error);
		apiResponse.message = "Couldn't delete room.";
		response.status(500);
		return response.json(apiResponse);
	}
});
