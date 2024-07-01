import { Treasures } from "./Treasure.model";

export type Room = {
	id: string;
	shareId: string;
	title: string;
	creationDate: Date;
	treasures: Treasures;
	creator: string;
};

export type NewRoom = Omit<Room, "id" | "creationDate">;

export type Rooms = Room[];
