import { randomUUID } from 'crypto';

export interface GuestIdentity {
	readonly id: string;
	readonly connectedAt: number;
}

export function createGuestIdentity(): GuestIdentity {
	return {
		id: randomUUID(),
		connectedAt: Date.now(),
	};
}
