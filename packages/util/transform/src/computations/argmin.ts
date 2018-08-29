import {
	isValid,
	observableStep,
	pipelineStepCalculation,
	StepCreator,
} from './util'
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
export function argmin$(
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	return makeArgmin(observableStep, field, compare)
}

export function argmin(
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	return makeArgmin(pipelineStepCalculation, field, compare)
}

function makeArgmin<T, X>(
	factory: StepCreator<T, T | undefined, X>,
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	let minValue: any
	let minItem: T | undefined

	return factory((d: T) => {
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
