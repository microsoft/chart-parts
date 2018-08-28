import { isValid, makeOperator } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function missing() {
	let numMissing = 0
	return makeOperator(v => (isValid(v) ? numMissing : ++numMissing))
}
