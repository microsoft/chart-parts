import { observableStep, pipelineStepTransform, StepCreator } from './util'
import { GetKeyFunction, identity } from '../interfaces'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function distinct$<T>(getKey: GetKeyFunction<T> = identity) {
	return makeDistinct(observableStep, getKey)
}

export function distinct<T>(getKey: GetKeyFunction<T> = identity) {
	return makeDistinct(pipelineStepTransform, getKey)
}

function makeDistinct<T, X>(
	creator: StepCreator<T, T, X>,
	getKey: GetKeyFunction<T>,
) {
	const set = new Set<T>()
	return creator(
		(v: T) => {
			const key = getKey(v)
			if (!set.has(key)) {
				set.add(key)
				return v
			}
			return (undefined as any) as T
		},
		(v: T) => !!v,
	)
}
