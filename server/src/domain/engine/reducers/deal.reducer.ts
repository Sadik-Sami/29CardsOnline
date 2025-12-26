import type { GameState } from '@/domain/engine/gameState';

export function dealReducer(state: GameState): GameState {
	if (state.phase !== 'WAITING') {
		throw new Error('PHASE_VIOLATION');
	}

	const firstBidder = ((state.dealerSeat + 1) % 4) as 0 | 1 | 2 | 3;

	return {
		...state,
		phase: 'BIDDING',
		currentBidTurnSeat: firstBidder,
		passedSeats: new Set(),
	};
}
