import { observableStep } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function count$() {
	let n = 0
	return observableStep(() => ++n)
}

export function count<T>() {
	return (data: T[]) => data.length
}
