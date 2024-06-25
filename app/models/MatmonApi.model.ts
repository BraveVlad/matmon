import { Platform } from "react-native";

export type RoomsApiResponse<T> = {
	message: string;
	data: T;
};

export type KeysApiResponse = {
	message: string;
	key: string;
};

export const MATMON_API = {
	base:
		Platform.OS === "web"
			? "http://localhost:3000"
			: "http://192.168.1",

	rooms: "/rooms",
};

export function getAllRoomsUri() {
	return MATMON_API.base + MATMON_API.rooms + "/all";
}

export function postCreateRoomUri() {
	return MATMON_API.base + MATMON_API.rooms + "/create";
}
