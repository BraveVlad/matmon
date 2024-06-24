import { Treasures } from "./Treasure.model";

export type Room = {
	id: string;
	title: string;
	creationDate: Date;
	treasures: Treasures;
	creator: undefined; // TODO - Change to a User model
};

export type Rooms = Room[];
