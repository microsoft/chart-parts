import { Observable, Subscriber, OperatorFunction } from 'rxjs'

/**
 * Determines if a value is not null, undefined or NaN
 */
export function isValid(v: any) {
	return v !== null && v !== undefined && !Number.isNaN(v)
}

/**
 * Computes a new mean incrementally
 * https://math.stackexchange.com/questions/106700/incremental-averageing
 */
export function incrementalMean(v: number, prevMean: number, numItems: number) {
	return prevMean + (v - prevMean) / numItems
}

/**
 * Creates a new RxJS pipeable operator function
 * @param getNextValue Determine the next value in the stream given the current value
 */
export function makeOperator<T, K>(
	getNextValue: (value: T) => K,
): OperatorFunction<T, K> {
	return (source: Observable<T>) =>
		Observable.create((subscriber: Subscriber<K>) =>
			source.subscribe(
				v => {
					try {
						const nextValue = getNextValue(v)
						subscriber.next(nextValue)
					} catch (err) {
						subscriber.error(err)
					}
				},
				err => subscriber.error(err),
				() => subscriber.complete(),
			),
		)
}
