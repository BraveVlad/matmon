import { Router } from "express";
import { MOCK_ROOMS } from "../data/rooms.Mock";
import { Rooms } from "../models/Room.model";

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
		apiResponse.message = "Something went wrong!";
		response.status(500);
		response.json(apiResponse);
		return;
	}

	if (rooms.length === 0) {
		apiResponse.message = "NO_ROOMS_FOUND";
		response.status(200);
		response.json(apiResponse);
		return;
	}

	apiResponse.data = rooms;

	response.status(200);
	response.json(apiResponse);
});
