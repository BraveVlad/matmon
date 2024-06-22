export type Room = {
	id: string;
	title: string;
	creationDate: Date;
	treasures: undefined;
	creator: undefined; // TODO - Change to a User model
};

export type Rooms = Room[];
