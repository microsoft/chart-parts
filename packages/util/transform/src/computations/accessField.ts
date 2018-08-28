import { makeOperator } from './util'
import { getField } from '../util'
import { FieldAccessor } from '../interfaces'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function accessField<T>(field: FieldAccessor) {
	return makeOperator<any, T>(d => getField(d, field))
}
