import { Schema, Types, model } from "mongoose";

export interface TreasureCoordinate {
	latitude: number;
	longitude: number;
}

const treasureCoordinateSchema = new Schema(
	{
		latitude: {
			type: Number,
			required: true,
		},
		longitude: {
			type: Number,
			required: true,
		},
	},
	{ _id: false }
);

export interface Treasure {
	id: string;
	name: string;
	searchRadius: number;
	isFound: boolean;
	coordinate: TreasureCoordinate;
}
export type Treasures = Treasure[];

export const treasureSchema = new Schema(
	{
		id: {
			type: String,
			required: true,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 25,
		},
		searchRadius: {
			type: Number,
			required: true,
			min: 0,
		},
		isFound: {
			type: Boolean,
			required: true,
			default: false,
		},
		coordinate: {
			type: treasureCoordinateSchema,
			required: true,
		},
	},
	{
		_id: false,
		timestamps: true,
	}
);

export const Treasure = model<Treasure>("Treasure", treasureSchema);
