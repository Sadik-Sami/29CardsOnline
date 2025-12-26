import type { GameState } from '../gameState';

export const initialState: GameState = {
	phase: 'WAITING',

	dealerSeat: 0,
	currentTurnSeat: 0,

	players: [
		{ seatIndex: 0, team: 'A', hand: [] },
		{ seatIndex: 1, team: 'B', hand: [] },
		{ seatIndex: 2, team: 'A', hand: [] },
		{ seatIndex: 3, team: 'B', hand: [] },
	],

	deck: [],
	bids: new Map(),
	trumpRevealed: false,
	multiplier: 1,

	currentTrick: {
		plays: [],
	},

	tricksWon: {
		A: [],
		B: [],
	},
};
