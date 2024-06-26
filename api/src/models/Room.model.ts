import { Treasures } from "./Treasure.model";

type user = {
	userId: string;
	userName: string;
	password: string;
	activeGameIds: string[];  
}

export type Room = {
	id: string;
	title: string;
	creationDate: Date;
	treasures: Treasures;
	creator: user;
};

export type NewRoom = Omit<Room, "id" | "creationDate">;

export type Rooms = Room[];
