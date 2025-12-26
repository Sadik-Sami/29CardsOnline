import type { Card } from '@/types/game.types';
import type { TrumpType } from '@/domain/rules/trump';

export type EngineIntent =
	| { type: 'DEAL' }
	| { type: 'PLACE_BID'; seatIndex: number; amount: number }
	| { type: 'SELECT_TRUMP'; trump: TrumpType }
	| { type: 'PLAY_CARD'; seatIndex: number; card: Card };
