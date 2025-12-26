import type { GamePhase } from '@/domain/rules/phase';

export function assertPhase(current: GamePhase, expected: GamePhase): void {
	if (current !== expected) {
		throw new Error('PHASE_VIOLATION');
	}
}
