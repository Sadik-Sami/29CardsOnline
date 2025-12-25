import { randomUUID } from 'crypto';
import type { Room, RoomParticipant, SeatIndex, Team } from '@/types/room.types';

const rooms = new Map<string, Room>();

function generateRoomCode(): string {
	return Math.random().toString(36).substring(2, 7).toUpperCase();
}

function deriveTeam(seatIndex: SeatIndex): Team {
	return seatIndex === 0 || seatIndex === 2 ? 'A' : 'B';
}

export function createRoom(guestId: string): Room {
	const id = randomUUID();
	const code = generateRoomCode();

	const participant: RoomParticipant = {
		guestId,
		seatIndex: 0,
		team: deriveTeam(0),
	};

	const room: Room = {
		id,
		code,
		participants: [participant],
		createdAt: Date.now(),
		lastActivityAt: Date.now(),
	};

	rooms.set(code, room);
	return room;
}

export function joinRoom(code: string, guestId: string): Room {
	const room = rooms.get(code.toUpperCase());
	if (!room) {
		throw new Error('Room not found');
	}
	if (room.participants.length >= 4) {
		throw new Error('Room is full');
	}

	const seatIndex = room.participants.length as SeatIndex;

	const participant: RoomParticipant = {
		guestId,
		seatIndex,
		team: deriveTeam(seatIndex),
	};

	const updatedRoom: Room = {
		...room,
		participants: [...room.participants, participant],
		lastActivityAt: Date.now(),
	};

	rooms.set(code, updatedRoom);
	return updatedRoom;
}

export function getRoomByCode(code: string): Room | undefined {
	return rooms.get(code);
}
