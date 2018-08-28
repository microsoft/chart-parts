import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { isValid } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function sum(source: Observable<number>) {
	let sumValue = 0
	return source.pipe(
		map(v => {
			if (isValid(v)) {
				sumValue += v
			}
			return sumValue
		}),
	)
}
