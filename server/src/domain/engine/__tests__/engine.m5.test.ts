import { GameEngine } from '../GameEngine';
import { initialState } from './initialState';

console.log('--- Milestone 5 Tests ---');

const engine = new GameEngine(initialState);

// DEAL → BIDDING
engine.dispatch({ type: 'DEAL' });

// Simple bidding
engine.dispatch({ type: 'PLACE_BID', seatIndex: 1, amount: 16 });
engine.dispatch({ type: 'PLACE_BID', seatIndex: 2, amount: 0 });
engine.dispatch({ type: 'PLACE_BID', seatIndex: 3, amount: 0 });
engine.dispatch({ type: 'PLACE_BID', seatIndex: 0, amount: 0 });

// SUIT trump
engine.dispatch({
	type: 'SELECT_TRUMP',
	trump: { type: 'SUIT', suit: 'SPADES' },
});

console.log('Trump:', engine.getState().trump);
console.log('Revealed:', engine.getState().trumpRevealed);

console.log('--- Milestone 5 Finished ---');
