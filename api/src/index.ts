import "dotenv/config";

import mongoose from "mongoose";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { router as RoomsRouter } from "./routers/Rooms.Router";
import { router as KeysRouter } from "./routers/Keys.Router";

const app = express();

app.use(cors());
app.use(json());

app.use("/rooms", RoomsRouter);
app.use("/keys", KeysRouter);

app.get("/check", async (_, res) => {
	res.status(200);
	res.json({ status: "Matmon backened is OK" });
});

async function init() {
	if (!process.env.MONGO_CONN_STRING) {
		throw new Error("Must provide connection string");
	}

	if (!process.env.MAPS_API_KEY) {
		console.error("WARNING - Maps api key not provided!");
	}

	// await mongoose.connect(process.env.MONGO_CONN_STRING, {
	// 	dbName: "",
	// });

	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://127.0.0.1:${process.env.MAIN_PORT}`)
	);
}

init();
