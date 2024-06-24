import { Platform } from "react-native";

const PERFIXES = {
	rooms: "/rooms",
};
export function getApiUri() {
	return Platform.OS === "web" ? "http://localhost:3000" : "192.168.1.43:3000";
}

export function getAllRoomsUri() {
	return getApiUri + PERFIXES.rooms + "/all";
}
