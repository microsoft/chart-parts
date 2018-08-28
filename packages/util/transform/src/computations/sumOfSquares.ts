import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { isValid } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function sumOfSquares(source: Observable<number>) {
	let result = 0
	return source.pipe(
		map(v => {
			if (!isValid(v)) {
				return result
			} else {
				result += Math.pow(v, 2)
				return result
			}
		}),
	)
}
