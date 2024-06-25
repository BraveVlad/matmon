import { Router } from "express";

export const router = Router();

export type KeysApiResponse = {
	message: string;
	key: string;
};

router.get("/maps", (_, response) => {
	const apiResponse: KeysApiResponse = {
		message: "OK",
		key: "",
	};

	const mapsApiKey = process.env.MAPS_API_KEY;

	if (!mapsApiKey) {
		apiResponse.message = "KEY_NOT_FOUND";
		response.status(404);
		return response.json(mapsApiKey);
	}

	apiResponse.key = mapsApiKey;
	response.status(200);
	response.json(apiResponse);
});
