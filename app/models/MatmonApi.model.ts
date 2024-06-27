export type RoomsApiResponse<T> = {
	message: string;
	data: T;
};

export const MATMON_API = {
	base: "https://matmon-server.onrender.com",
	rooms: "/rooms",
};

export function getAllRoomsUri(username: string) {
	return MATMON_API.base + MATMON_API.rooms + `/${username}`;
}

export function postCreateRoomUri() {
	return MATMON_API.base + MATMON_API.rooms + "/create";
}
