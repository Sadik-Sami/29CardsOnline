export const MULTIPLIERS = [1, 2, 4] as const;
export type Multiplier = (typeof MULTIPLIERS)[number];

export const DEFAULT_MULTIPLIER: Multiplier = 1;
