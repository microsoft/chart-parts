import { isValid, makeOperator } from './util'
import {
	CompareFunction,
	defaultComparator,
	FieldAccessor,
} from '../interfaces'
import { getField } from '../util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function argmax<T>(
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	let maxValue: any
	let maxItem: T | undefined

	return makeOperator<T, T | undefined>(d => {
		if (d === undefined) {
			return maxItem
		}

		const value = getField(d, field)
		if (isValid(value)) {
			if (maxValue === undefined || compare(value, maxValue) > 0) {
				maxValue = value
				maxItem = d
			}
		}
		return maxItem
	})
}
