import type { Card, Suit } from "@/types/game.types";

export function getLeadSuit(trick: readonly Card[]): Suit | undefined {
	return trick.length > 0 ? trick[0]?.suit : undefined;
}
