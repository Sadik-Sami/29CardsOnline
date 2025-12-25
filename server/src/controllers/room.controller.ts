import type { WebSocket } from 'ws';
import { createRoom, joinRoom } from '@/services/roomRegistry';
import { addMember, getRoomSockets } from '@/services/roomMembership';
import { broadcast } from '@/utils/broadcast';
import type { ClientIntent, ServerEvent } from '@/types/ws.types';

interface SocketWithGuest extends WebSocket {
	guestId: string;
}

export function handleRoomIntent(ws: WebSocket, intent: ClientIntent): void {
	const socket = ws as SocketWithGuest;
	const guestId = socket.guestId;

	try {
		switch (intent.type) {
			case 'CREATE_ROOM': {
				const room = createRoom(guestId);
				addMember(room.code, guestId, socket);

				broadcast(getRoomSockets(room.code), { type: 'ROOM_CREATED', payload: room });
				break;
			}

			case 'JOIN_ROOM': {
				const room = joinRoom(intent.payload.code, guestId);
				addMember(room.code, guestId, socket);

				broadcast(getRoomSockets(room.code), { type: 'ROOM_JOINED', payload: room });
				break;
			}
		}
	} catch (err) {
		socket.send(
			JSON.stringify({
				type: 'ERROR',
				payload: {
					message: err instanceof Error ? err.message : 'UNKNOWN_ERROR',
				},
			})
		);
	}
}
