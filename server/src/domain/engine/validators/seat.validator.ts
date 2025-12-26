import type { SeatIndex } from '@/types/room.types';

export function assertSeatIndex(value: number): asserts value is SeatIndex {
	if (value !== 0 && value !== 1 && value !== 2 && value !== 3) {
		throw new Error('INVALID_SEAT_INDEX');
	}
}
