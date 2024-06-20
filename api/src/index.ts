import "dotenv/config";

import express from "express";
import cors from "cors";
import { json } from "body-parser";

const app = express();

app.use(cors());
app.use(json());

// TODO - replace with real DBs

app.get("/check", async (_, res) => {
	res.status(200);
	res.json({ status: "Matmon backened is OK" });
});

async function init() {
	// Add DB connection

	app.listen(process.env.MAIN_PORT, () =>
		console.log(`Server running on http://127.0.0.1:${process.env.MAIN_PORT}`)
	);
}

init();
