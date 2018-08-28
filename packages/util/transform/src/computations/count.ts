import { makeOperator } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function count() {
	let n = 0
	return makeOperator(() => ++n)
}
