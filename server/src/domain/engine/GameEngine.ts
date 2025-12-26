import type { GameState } from './gameState';
import type { EngineIntent } from './intents';

import { dealReducer } from './reducers/deal.reducer';
import { bidReducer } from './reducers/bid.reducer';
import { trumpReducer } from './reducers/trump.reducer';
import { playReducer } from './reducers/play.reducer';

export class GameEngine {
	private state: GameState;

	constructor(initialState: GameState) {
		this.state = initialState;
	}

	public getState(): GameState {
		return this.state;
	}

	public dispatch(intent: EngineIntent): GameState {
		switch (intent.type) {
			case 'DEAL':
				this.state = dealReducer(this.state);
				break;

			case 'PLACE_BID':
				this.state = bidReducer(this.state, intent);
				break;

			case 'SELECT_TRUMP':
				this.state = trumpReducer(this.state, intent);
				break;

			case 'PLAY_CARD':
				this.state = playReducer(this.state, intent);
				break;

			default:
				throw new Error('UNKNOWN_INTENT');
		}

		return this.state;
	}
}
