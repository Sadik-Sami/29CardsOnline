import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import { createGuestIdentity } from '@/utils/guestIdentity';
import type { ClientIntent } from '@/types/ws.types';
import { handleRoomIntent } from '@/controllers/room.controller';
import { getRoomSockets, removeMember } from '@/services/roomMembership';
import { getRoomByCode } from '@/services/roomRegistry';
import { broadcast } from '@/utils/broadcast';

interface SocketWithGuest extends WebSocket {
	guestId: string;
}

export function startWebSocketServer(server: Server): void {
	const wss = new WebSocketServer({ server });

	wss.on('connection', (socket: WebSocket) => {
		const guest = createGuestIdentity();
		const ws = socket as SocketWithGuest;
		ws.guestId = guest.id;

		console.log(`[WS] Connected: guestId=${guest.id}`);

		ws.on('message', (data) => {
			try {
				const parsed = JSON.parse(data.toString()) as ClientIntent;
				handleRoomIntent(ws, parsed);
			} catch {
				ws.send(
					JSON.stringify({
						type: 'ERROR',
						payload: { message: 'INVALID_MESSAGE_FORMAT' },
					})
				);
			}
		});

		ws.on('close', () => {
			const roomCode = removeMember(ws.guestId, ws);
			console.log(`[WS] Disconnected: guestId=${ws.guestId}`);

			if (!roomCode) return;

			const room = getRoomByCode(roomCode);
			if (!room) return;

			broadcast(getRoomSockets(roomCode), { type: 'ROOM_LEFT', payload: room });
		});
	});
}
