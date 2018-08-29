import { isValid, observableStep } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function missing$() {
	let numMissing = 0
	return observableStep(v => (isValid(v) ? numMissing : ++numMissing))
}
