import { isValid, makeOperator } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function sum() {
	let sumValue = 0
	return makeOperator<number | undefined, number>(v => {
		if (isValid(v)) {
			sumValue += v as number
		}
		return sumValue
	})
}
