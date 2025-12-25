import { WebSocket } from 'ws';
import type { ServerEvent } from '@/types/ws.types';

export function broadcast(sockets: ReadonlySet<WebSocket>, event: ServerEvent): void {
	const message = JSON.stringify(event);

	for (const socket of sockets) {
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(message);
		}
	}
}
