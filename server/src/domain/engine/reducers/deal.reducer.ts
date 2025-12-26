import type { GameState } from '../gameState';
import { GAME_PHASES } from '@/domain/rules/phase';

export function dealReducer(state: GameState): GameState {
	if (state.phase !== 'WAITING') {
		throw new Error('PHASE_VIOLATION');
	}

	return {
		...state,
		phase: 'BIDDING',
		// actual dealing logic added later
	};
}
