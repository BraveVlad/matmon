export type TreasureCoordinate = {
	latitude: number;
	longitude: number;
};

export type Treasure = {
	id: string;
	name: string;
	searchRadius: number;
	isFound: boolean;
	coordinate: TreasureCoordinate;
};

export type Treasures = Treasure[];
