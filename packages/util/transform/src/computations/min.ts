import { isValid, observableStep } from './util'
import { CompareFunction, defaultComparator } from '../interfaces'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function min$<T>(compare: CompareFunction<T> = defaultComparator) {
	let minValue: T | undefined
	return observableStep<T, T | undefined>(v => {
		if (isValid(v)) {
			if (minValue === undefined) {
				minValue = v
			}

			minValue = compare(v, minValue) < 0 ? v : minValue
		}
		return minValue
	})
}
