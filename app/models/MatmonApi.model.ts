export type RoomsApiResponse<T> = {
	message: string;
	data: T;
};

export type GameApiResponse<T> = {
	message: string;
	data?: T;
};

export const MATMON_API = {
	// base: "http://192.168.1.43:3000",
	base: "https://matmon-server.onrender.com",
	rooms: "/rooms",
	game: "/game",
};

export function getAllRoomsUri(username: string) {
	return MATMON_API.base + MATMON_API.rooms + `/${username}`;
}

export function getSingleRoomUri(roomId: string) {
	return MATMON_API.base + MATMON_API.rooms + `/single/${roomId}`;
}

export function postCreateRoomUri() {
	return MATMON_API.base + MATMON_API.rooms + "/create";
}

export function deleteRoomUri() {
	return MATMON_API.base + MATMON_API.rooms + "/delete";
}

export function getGameUri(gameId: string) {
	return MATMON_API.base + MATMON_API.game + `/${gameId}`;
}
