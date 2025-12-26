import type { GameState } from '@/domain/engine/gameState';
import type { EngineIntent } from '@/domain/engine/intents';
import type { SeatIndex } from '@/types/room.types';
import { isValidBid } from '@/domain/rules/bidding';
import { assertSeatIndex } from '@/domain/engine/validators/seat.validator';

export function bidReducer(state: GameState, intent: EngineIntent): GameState {
	if (state.phase !== 'BIDDING') {
		throw new Error('PHASE_VIOLATION');
	}

	if (intent.type !== 'PLACE_BID') {
		throw new Error('INVALID_INTENT_FOR_PHASE');
	}

	const { seatIndex, amount } = intent;
	assertSeatIndex(seatIndex);

	if (state.currentBidTurnSeat !== seatIndex) {
		throw new Error('OUT_OF_TURN_BID');
	}

	const bids = new Map(state.bids);
	const passed = new Set(state.passedSeats ?? []);

	// PASS
	if (amount === 0) {
		passed.add(seatIndex);
	} else {
		const currentHighest = bids.size === 0 ? 0 : Math.max(...bids.values());

		if (!isValidBid(amount, currentHighest)) {
			throw new Error('INVALID_BID');
		}

		bids.set(seatIndex, amount);
	}

	// bidding end condition
	const activeBidders = 4 - passed.size;

	if (activeBidders === 1) {
		let winnerSeat: SeatIndex | undefined;
		let winningBid = 0;

		for (const [seat, bid] of bids.entries()) {
			if (bid > winningBid) {
				winningBid = bid;
				winnerSeat = seat;
			}
		}

		if (winnerSeat === undefined) {
			throw new Error('NO_VALID_BID');
		}

		return {
			...state,
			bids,
			passedSeats: passed,
			winningBid,
			bidWinnerSeat: winnerSeat,
			phase: 'TRUMP_SELECTION',
		};
	}

	// Advance turn
	const nextSeat = ((seatIndex + 1) % 4) as 0 | 1 | 2 | 3;

	return {
		...state,
		bids,
		passedSeats: passed,
		currentBidTurnSeat: nextSeat,
	};
}
