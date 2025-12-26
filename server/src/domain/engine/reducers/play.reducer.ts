import type { GameState } from '@/domain/engine/gameState';
import type { EngineIntent } from '@/domain/engine/intents';

export function playReducer(state: GameState, intent: EngineIntent): GameState {
	if (state.phase !== 'PLAYING') {
		throw new Error('PHASE_VIOLATION');
	}

	if (intent.type !== 'PLAY_CARD') {
		throw new Error('INVALID_INTENT_FOR_PHASE');
	}

	// Card play logic will be implemented in Milestone 6
	return state;
}
