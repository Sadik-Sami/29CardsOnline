import type { Card } from '@/types/game.types.js';
import type { SeatIndex, Team } from '@/types/room.types';
import type { GamePhase } from '@/domain/rules/phase';
import type { TrumpType } from '@/domain/rules/trump';
import type { Multiplier } from '@/domain/rules/multipliers';

export interface PlayerState {
	readonly seatIndex: SeatIndex;
	readonly team: Team;
	readonly hand: readonly Card[];
}

export interface TrickState {
	readonly leadSuit?: Card['suit'];
	readonly plays: readonly { seatIndex: SeatIndex; card: Card }[];
}

export interface GameState {
	readonly phase: GamePhase;
	readonly dealerSeat: SeatIndex;
	readonly currentTurnSeat: SeatIndex;

	readonly players: readonly PlayerState[];

	readonly deck: readonly Card[];
	readonly bids: ReadonlyMap<SeatIndex, number>;

	readonly currentBidTurnSeat?: SeatIndex;
	readonly passedSeats?: ReadonlySet<SeatIndex>;

	readonly winningBid?: number;
	readonly bidWinnerSeat?: SeatIndex;

	readonly trump?: TrumpType;
	readonly hiddenTrump?: TrumpType;
	readonly trumpRevealed: boolean;

	readonly multiplier: Multiplier;

	readonly currentTrick: TrickState;

	readonly tricksWon: {
		readonly A: readonly Card[];
		readonly B: readonly Card[];
	};
}
