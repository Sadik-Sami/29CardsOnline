import type { Suit } from '@/types/game.types';

export type TrumpType =
	| { readonly type: 'SUIT'; readonly suit: Suit }
	| { readonly type: 'SEVENTH_CARD' }
	| { readonly type: 'JOKER' };
