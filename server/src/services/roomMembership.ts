import type { WebSocket } from 'ws';

const guestToRoom = new Map<string, string>();
const roomToSockets = new Map<string, Set<WebSocket>>();

export function addMember(roomCode: string, guestId: string, socket: WebSocket): void {
	if (guestToRoom.has(guestId)) {
		throw new Error('Guest is already in a room');
	}
	guestToRoom.set(guestId, roomCode);

	const sockets = roomToSockets.get(roomCode) ?? new Set<WebSocket>();
	sockets.add(socket);
	roomToSockets.set(roomCode, sockets);
}

export function removeMember(guestId: string, socket: WebSocket): string | undefined {
	const roomCode = guestToRoom.get(guestId);
	if (!roomCode) return;

	guestToRoom.delete(guestId);

	const sockets = roomToSockets.get(roomCode);
	if (!sockets) return roomCode;

	sockets.delete(socket);

	if (sockets.size === 0) {
		roomToSockets.delete(roomCode);
	}

	return roomCode;
}

export function getRoomSockets(roomCode: string): ReadonlySet<WebSocket> {
	return roomToSockets.get(roomCode) ?? new Set<WebSocket>();
}

export function getGuestRoom(guestId: string): string | undefined {
	return guestToRoom.get(guestId);
}
