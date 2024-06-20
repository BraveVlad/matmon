import { createConnection, Connection } from "mysql2/promise";

let connection: Connection | undefined;

export function getConnection() {
	if (!connection) {
		throw new Error("Must init connection first!");
	}

	return connection;
}

export async function initConnection() {
	connection = await createConnection({
		host: "",
		user: "",
		password: "",
		database: "",
	});
}
