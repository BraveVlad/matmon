import { Treasures } from "./Treasure.model";

export type user = {
	userId: string;
	userName: string;
	password: string;
	activeRooms: string[];
}

export type Room = {
	_id: string;
	title: string;
	creationDate: Date;
	treasures: Treasures;
	creator: string; // userId 
};

export type NewRoom = Omit<Room, "id" | "creationDate">;

export type Rooms = Room[];
