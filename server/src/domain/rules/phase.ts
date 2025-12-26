export const GAME_PHASES = [
	'WAITING',
	'DEALING',
	'BIDDING',
	'TRUMP_SELECTION',
	'MULTIPLIER',
	'PLAYING',
	'ROUND_END',
	'GAME_END',
	'CANCELLED',
] as const;

export type GamePhase = (typeof GAME_PHASES)[number];
