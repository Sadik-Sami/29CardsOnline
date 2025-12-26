import type { GameState } from '@/domain/engine/gameState';
import type { EngineIntent } from '@/domain/engine/intents';

export function bidReducer(state: GameState, intent: EngineIntent): GameState {
	if (state.phase !== 'BIDDING') {
		throw new Error('PHASE_VIOLATION');
	}

	if (intent.type !== 'PLACE_BID') {
		throw new Error('INVALID_INTENT_FOR_PHASE');
	}

	// Bidding logic will be implemented in Milestone 5
	// For now, return state unchanged
	return state;
}
