import { Schema, Types, model } from "mongoose";
import { Treasures, treasureSchema } from "./Treasure.model";

export interface Room {
	title: string;
	creationDate: Date;
	treasures: Treasures;
	creator: string;
}
export type NewRoom = Omit<Room, "creationDate">;
export type Rooms = Room[];

const roomSchema = new Schema<Room>({
	title: {
		type: String,
		requied: true,
		maxlength: 25,
		minLength: 5,
	},
	creationDate: {
		type: Date,
		requied: true,
		default: Date.now,
	},
	treasures: [treasureSchema],
	creator: {
		type: String,
		requied: true,
		maxlength: 25,
		minLength: 0,
	},
});

export const Room = model<Room>("Room", roomSchema, "rooms");
