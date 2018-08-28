/**
 * Determines if a value is not null, undefined or NaN
 */
export function isValid(v: any) {
	return v !== null && v !== undefined && !Number.isNaN(v)
}

/**
 * Computes a new mean incrementally
 * https://math.stackexchange.com/questions/106700/incremental-averageing
 */
export function incrementalMean(v: number, prevMean: number, numItems: number) {
	return prevMean + (v - prevMean) / numItems
}
