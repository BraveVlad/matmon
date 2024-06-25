import { Router } from "express";

export const router = Router();

router.get("/maps", (_, response) => {
	const mapsApiKey = process.env.MAPS_API_KEY;

	if (!mapsApiKey) {
		response.status(404);
		return response.json({ error: "KEY_NOT_FOUND" });
	}

	response.status(200);
	response.json({ key: mapsApiKey });
});
