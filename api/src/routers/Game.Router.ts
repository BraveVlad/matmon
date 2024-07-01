import { Router } from "express";
import { Room } from "../models/Room.model";

export const router = Router();

type GameApiResponse<T> = {
	message: string;
	data?: T;
};

router.get("/:gameId", async (request, response) => {
	const { gameId } = request.params;
	const apiResponse: GameApiResponse<Room> = {
		message: "OK",
		data: undefined,
	};

	try {
		const room = await Room.findOne({ shareId: gameId });

		if (!room) {
			apiResponse.message = "Couldn't find game.";
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
		apiResponse.message = `Couldn't find game with id: ${gameId}.`;
		response.status(500);
		response.json(apiResponse);
	}
});
