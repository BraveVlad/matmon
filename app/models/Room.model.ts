import { Treasures } from "./Treasure.model";

export type Room = {
	_id: string;
	title: string;
	creationDate: Date;
	treasures: Treasures;
	creator: string; // TODO - Change to a User model
};

export type NewRoom = Omit<Room, "id" | "creationDate">;

export type Rooms = Room[];
