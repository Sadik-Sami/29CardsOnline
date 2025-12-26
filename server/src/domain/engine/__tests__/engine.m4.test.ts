import { GameEngine } from '../GameEngine';
import { initialState } from './initialState';

/**
 * Milestone 4 Engine Tests
 * Purpose: verify engine structure, not gameplay
 */

console.log('--- Milestone 4 Engine Tests ---');

// 1️⃣ Engine Instantiation
const engine = new GameEngine(initialState);
console.log('Initial phase:', engine.getState().phase);

// 2️⃣ DEAL transitions WAITING → BIDDING
engine.dispatch({ type: 'DEAL' });
console.log('Phase after DEAL:', engine.getState().phase);

// 3️⃣ Illegal intent in wrong phase
try {
	engine.dispatch({
		type: 'PLAY_CARD',
		seatIndex: 0,
		card: { suit: 'CLUBS', rank: 'J' },
	});
} catch (e) {
	console.log('Caught error (expected):', (e as Error).message);
}

// 4️⃣ Invalid intent in BIDDING phase
try {
	engine.dispatch({ type: 'DEAL' });
} catch (e) {
	console.log('Caught error (expected):', (e as Error).message);
}

// 5️⃣ State immutability check
const before = engine.getState();
engine.dispatch({ type: 'PLACE_BID', seatIndex: 1, amount: 16 });
const after = engine.getState();

console.log('State reference changed:', before !== after);

// 6️⃣ Unknown intent
try {
	engine.dispatch({ type: 'UNKNOWN' } as any);
} catch (e) {
	console.log('Caught error (expected):', (e as Error).message);
}

console.log('--- Milestone 4 Tests Finished ---');
