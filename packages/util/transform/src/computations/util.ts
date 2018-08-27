/**
 * Determines if a value is not null, undefined or NaN
 */
export function isValid(v: any) {
	return v !== null && v !== undefined && !Number.isNaN(v)
}
