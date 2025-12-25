import { WebSocketServer, WebSocket } from 'ws';
import type { Server } from 'http';
import { createGuestIdentity, type GuestIdentity } from '@/utils/guestIdentity';

export interface ConnectionContext {
	readonly socket: WebSocket;
	readonly guest: GuestIdentity;
}

export function startWebSocketServer(server: Server): void {
	const wss = new WebSocketServer({ server });

	wss.on('connection', (socket: WebSocket) => {
		const guest = createGuestIdentity();

		const context: ConnectionContext = {
			socket,
			guest,
		};

		console.log(`[WS] Connected: guestId=${guest.id}`);

		socket.on('close', () => {
			console.log(`[WS] Disconnected: guestId=${guest.id}`);
		});

		socket.on('error', (err) => {
			console.error(`[WS] Error: guestId=${guest.id}`, err);
		});
	});
}
