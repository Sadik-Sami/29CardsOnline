import type { Rank, Suit } from '@/types/game.types';

export const RANK_PRIORITY: readonly Rank[] = ['J', '9', 'A', '10', 'K', 'Q', '8', '7'] as const;
export const SUITS: readonly Suit[] = ['CLUBS', 'DIAMONDS', 'HEARTS', 'SPADES'] as const;

export function isHigherRank(a: Rank, b: Rank): boolean {
	return RANK_PRIORITY.indexOf(a) < RANK_PRIORITY.indexOf(b);
}
