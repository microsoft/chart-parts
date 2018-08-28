import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function distinct(source: Observable<any>) {
	const set = new Set<any>()
	let numDistinct = 0
	return source.pipe(
		map(v => {
			if (!set.has(v)) {
				set.add(v)
				return ++numDistinct
			} else {
				return numDistinct
			}
		}),
	)
}
