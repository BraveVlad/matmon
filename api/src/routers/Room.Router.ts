import { Router } from "express";

export const router = Router();

router.get("/check", (request, response) => {
	response.status(200).send("rooms router OK");
});
