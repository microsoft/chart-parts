import { isValid, makeOperator } from './util'
import { CompareFunction, defaultComparator } from '../interfaces'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function max<T>(compare: CompareFunction<T> = defaultComparator) {
	let maxValue: T | undefined
	return makeOperator<T, T | undefined>(v => {
		if (isValid(v)) {
			if (maxValue === undefined) {
				maxValue = v
			}

			maxValue = compare(v, maxValue) > 0 ? v : maxValue
		}
		return maxValue
	})
}
