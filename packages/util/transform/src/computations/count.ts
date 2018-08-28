import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function count(source: Observable<number>) {
	let n = 0
	return source.pipe(map(v => ++n))
}
