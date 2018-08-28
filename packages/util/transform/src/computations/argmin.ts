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
export function argmin<T>(
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	let minValue: any
	let minItem: T | undefined

	return makeOperator<T, T | undefined>(d => {
		if (d === undefined) {
			return minItem
		}

		const value = getField(d, field)
		if (isValid(value)) {
			if (minValue === undefined || compare(value, minValue) < 0) {
				minValue = value
				minItem = d
			}
		}
		return minItem
	})
}
