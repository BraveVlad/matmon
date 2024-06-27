import "dotenv/config";

import mongoose from "mongoose";

import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { router as RoomsRouter } from "./routers/Rooms.Router";

const app = express();

app.use(cors());
app.use(json());

app.use("/rooms", RoomsRouter);

app.get("/check", async (_, res) => {
	res.status(200);
	res.json({ status: "Matmon backened is OK" });
});

function setupConnectionEvents() {
	mongoose.connection.on("connected", () => console.log("mongoose connected"));
	mongoose.connection.on("open", () => console.log("mongoose open"));
	mongoose.connection.on("disconnected", () =>
		console.log("mongoose disconnected")
	);
	mongoose.connection.on("reconnected", () =>
		console.log("mongoose reconnected")
	);
	mongoose.connection.on("disconnecting", () =>
		console.log("mongoose disconnecting")
	);
	mongoose.connection.on("close", () => console.log("mongoose close"));
}

async function init() {
	if (!process.env.MONGO_CONN_STRING) {
		throw new Error("Must provide connection string");
	}

	setupConnectionEvents();
	await mongoose.connect(process.env.MONGO_CONN_STRING, {
		dbName: process.env.MONGO_DB_NAME,
	});

	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://0.0.0.0:${process.env.MAIN_PORT}`)
	);
}

init();
