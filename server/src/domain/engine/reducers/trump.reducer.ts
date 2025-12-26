import type { GameState } from '@/domain/engine/gameState';
import type { EngineIntent } from '@/domain/engine/intents';

export function trumpReducer(state: GameState, intent: EngineIntent): GameState {
	if (state.phase !== 'TRUMP_SELECTION') {
		throw new Error('PHASE_VIOLATION');
	}

	if (intent.type !== 'SELECT_TRUMP') {
		throw new Error('INVALID_INTENT_FOR_PHASE');
	}

	if (state.bidWinnerSeat === undefined) {
		throw new Error('NO_BID_WINNER');
	}

	const trump = intent.trump;

	// Suit Trump (revealed immediately)
	if (trump.type === 'SUIT') {
		return {
			...state,
			trump,
			trumpRevealed: true,
			phase: 'PLAYING',
			currentTurnSeat: state.bidWinnerSeat,
		};
	}

	// Seventh Card Trump (hidden initially)
	if (trump.type === 'SEVENTH_CARD') {
		return {
			...state,
			hiddenTrump: trump,
			trumpRevealed: false,
			phase: 'PLAYING',
			currentTurnSeat: state.bidWinnerSeat,
		};
	}

	// Joker Trump (revealed immediately)
	if (trump.type === 'JOKER') {
		return {
			...state,
			trump,
			trumpRevealed: true,
			phase: 'PLAYING',
			currentTurnSeat: state.bidWinnerSeat,
		};
	}

	throw new Error('INVALID_TRUMP_TYPE');
}
