export const MIN_BID = 16;
export const MAX_BID = 29;

export function isValidBid(bid: number, currentHighestBid: number): boolean {
	return bid > currentHighestBid && bid >= MIN_BID && bid <= MAX_BID;
}
