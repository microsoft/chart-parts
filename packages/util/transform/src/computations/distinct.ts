import { makeOperator } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function distinct() {
	const set = new Set<any>()
	let numDistinct = 0
	return makeOperator(v => {
		if (!set.has(v)) {
			set.add(v)
			numDistinct += 1
		}
		return numDistinct
	})
}
