import { Platform } from "react-native";

export const MATMON_API = {
	base:
		Platform.OS === "web"
			? "http://localhost:3000"
			: "http://192.168.1.43:3000",

	rooms: "/rooms",
};

export function getAllRoomsUri() {
	return MATMON_API.base + MATMON_API.rooms + "/all";
}
