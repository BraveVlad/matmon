export type RoomsApiResponse<T> = {
	message: string;
	data: T;
};

export const MATMON_API = {
	base: "http://192.168.1.43:3000",
	rooms: "/rooms",
};

export function getAllRoomsUri() {
	return MATMON_API.base + MATMON_API.rooms + "/all";
}

export function postCreateRoomUri() {
	return MATMON_API.base + MATMON_API.rooms + "/create";
}
