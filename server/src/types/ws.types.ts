import type { Room } from './room.types';

export type ClientIntent = { type: 'CREATE_ROOM' } | { type: 'JOIN_ROOM'; payload: { code: string } };
export type ServerEvent =
	| { type: 'ROOM_CREATED'; payload: Room }
	| { type: 'ROOM_JOINED'; payload: Room }
| { type: 'ROOM_LEFT'; payload: Room }
	| { type: 'ERROR'; payload: { message: string } };
