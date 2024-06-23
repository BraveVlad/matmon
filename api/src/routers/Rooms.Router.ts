import { Router } from "express";

export const router = Router();

router.get("/check", (request, response) => {
	response.status(200).json({ status: "Rooms router is OK" });
});
