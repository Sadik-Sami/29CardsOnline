import type { Rank } from '@/types/game.types';

export const RANK_POINTS: Readonly<Record<Rank, number>> = {
	J: 3,
	'9': 2,
	A: 1,
	'10': 1,
	K: 0,
	Q: 0,
	'8': 0,
	'7': 0,
};

export const TOTAL_TRICK_POINTS = 28;
export const FINAL_BONUS_POINT = 1;
export const MAX_ROUND_POINTS = 29;
