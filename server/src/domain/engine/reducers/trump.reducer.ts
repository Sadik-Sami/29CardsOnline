import type { GameState } from '@/domain/engine/gameState';
import type { EngineIntent } from '@/domain/engine/intents';

export function trumpReducer(state: GameState, intent: EngineIntent): GameState {
	if (state.phase !== 'TRUMP_SELECTION') {
		throw new Error('PHASE_VIOLATION');
	}

	if (intent.type !== 'SELECT_TRUMP') {
		throw new Error('INVALID_INTENT_FOR_PHASE');
	}

	// Trump selection logic will be implemented in Milestone 5
	return state;
}
