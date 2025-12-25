export type SeatIndex = 0 | 1 | 2 | 3;
export type Team = 'A' | 'B';

export interface RoomParticipant {
	readonly guestId: string;
	readonly seatIndex: SeatIndex;
	readonly team: Team;
}

export interface Room {
	readonly id: string;
	readonly code: string;
	readonly participants: ReadonlyArray<RoomParticipant>;
	readonly createdAt: number;
	readonly lastActivityAt: number;
}
