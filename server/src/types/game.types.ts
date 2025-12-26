export type Suit = 'CLUBS' | 'DIAMONDS' | 'HEARTS' | 'SPADES';

export type Rank = 'J' | '9' | 'A' | '10' | 'K' | 'Q' | '8' | '7';

export interface Card {
	suit: Suit;
	rank: Rank;
}

