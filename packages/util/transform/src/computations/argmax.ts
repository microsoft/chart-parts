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
export function argmax$(
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	return makeArgmax(observableStep, field, compare)
}

/**
 * Creates an pipeline node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function argmax(
	field: FieldAccessor,
	compare: CompareFunction<unknown> = defaultComparator,
) {
	return makeArgmax(pipelineStepCalculation, field, compare)
}

function makeArgmax<T, X>(
	factory: StepCreator<T, T, X>,
	field: FieldAccessor,
	compare: CompareFunction<unknown>,
) {
	let maxValue: any
	let maxItem: T | undefined

	return factory((d: T) => {
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
