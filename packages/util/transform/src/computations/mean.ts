import { Observable, zip } from 'rxjs'
import { map } from 'rxjs/operators'
import { isValid, incrementalMean } from './util'
import valid from './valid'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export default function mean(source: Observable<number>) {
	let prevMean: number | undefined
	return zip(valid(source), source).pipe(
		map(([n, curr]) => {
			if (!isValid(curr)) {
				return prevMean
			} else if (prevMean === undefined) {
				prevMean = curr
				return curr
			} else {
				const nextMean = incrementalMean(curr, prevMean, n)
				prevMean = nextMean
				return nextMean
			}
		}),
	)
}
