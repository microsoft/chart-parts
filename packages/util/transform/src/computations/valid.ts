import { isValid, observableStep } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function valid$() {
	let numValid = 0
	return observableStep(v => (isValid(v) ? ++numValid : numValid))
}
