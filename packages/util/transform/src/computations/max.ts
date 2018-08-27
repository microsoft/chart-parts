import { BehaviorSubject, Observable } from 'rxjs'
import { isValid } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function max(source: Observable<number>) {
	const result = new BehaviorSubject(undefined)
	source.subscribe(
		v =>
			isValid(v) &&
			(result.value === undefined || v > result.value) &&
			result.next(v),
		err => result.error(err),
		() => result.complete(),
	)
	return result
}
