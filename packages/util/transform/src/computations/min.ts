import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { isValid } from './util'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function min(source: Observable<number>) {
	let minValue: undefined | number
	return source.pipe(
		map(v => {
			if (!isValid(v)) {
				return minValue
			}
			minValue = minValue === undefined || v < minValue ? v : minValue
			return minValue
		}),
	)
}
