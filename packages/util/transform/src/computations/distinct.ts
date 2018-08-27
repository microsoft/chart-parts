import { BehaviorSubject, Observable } from 'rxjs'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function distinct(source: Observable<any>) {
	const set = new Set<any>()
	const result = new BehaviorSubject(0)
	source.subscribe(
		v => {
			if (!set.has(v)) {
				set.add(v)
				result.next(result.value + 1)
			}
		},
		err => result.error(err),
		() => result.complete(),
	)
	return result
}
