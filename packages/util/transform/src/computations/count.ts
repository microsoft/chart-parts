import { BehaviorSubject, Observable } from 'rxjs'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function count(source: Observable<number>) {
	const result = new BehaviorSubject(0)
	source.subscribe(
		v => result.next(result.value + 1),
		err => result.error(err),
		() => result.complete(),
	)
	return result
}
