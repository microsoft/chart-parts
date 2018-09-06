/**
 * Converts a nullable boolean into a boolean
 * @param value The optional boolean property to convert to a boolean
 */
export function propToBool<T>(value?: T): T | boolean {
	return value === undefined ? false : value
}
