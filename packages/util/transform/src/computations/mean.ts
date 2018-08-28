import { Observable, zip, Subscriber, OperatorFunction } from 'rxjs'
import { isValid, incrementalMean } from './util'
import { valid } from './valid'
import { MaybeNumber } from '../interfaces'

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function mean(): OperatorFunction<MaybeNumber, number> {
	let prevMean: number = 0
	return (source: Observable<MaybeNumber>) =>
		Observable.create((subscriber: Subscriber<number>) =>
			zip(source.pipe(valid()), source).subscribe(
				([n, curr]) => {
					try {
						const nextMean = computeMean(curr, prevMean, n)
						prevMean = nextMean
						subscriber.next(nextMean)
					} catch (err) {
						subscriber.error(err)
					}
				},
				err => subscriber.error(err),
				() => subscriber.complete(),
			),
		)
}

function computeMean(
	value: MaybeNumber,
	prevMean: number,
	count: number,
): number {
	if (!isValid(value)) {
		return prevMean
	} else if (prevMean === undefined) {
		return value || 0
	} else {
		return incrementalMean(value as number, prevMean, count)
	}
}
