import { OperatorFunction } from 'rxjs'
import { observableStep, pipelineStepTransform, StepCreator } from './util'
import { getField } from '../util'
import { FieldAccessor } from '../interfaces'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function accessField$<T>(field: FieldAccessor) {
	return makeAccessField<T, OperatorFunction<T, any>>(observableStep, field)
}

export function accessField(field: FieldAccessor) {
	return makeAccessField(pipelineStepTransform, field)
}

function makeAccessField<T, X>(
	factory: StepCreator<T, any, X>,
	field: FieldAccessor,
) {
	return factory((d: T) => getField(d, field))
}
