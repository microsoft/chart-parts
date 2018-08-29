import { Observable, Subscriber, OperatorFunction } from 'rxjs'
import { Predicate } from '../interfaces'

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
 * @param transform Determine the next value in the stream given the current value
 */
export function observableStep<T, K>(
	transform: Transformer<T, K>,
	emitValue: Predicate<K | undefined> = () => true,
): OperatorFunction<T, K> {
	return (source: Observable<T>) =>
		Observable.create((subscriber: Subscriber<K>) =>
			source.subscribe(
				v => {
					try {
						const nextValue = transform(v)
						if (emitValue(nextValue)) {
							subscriber.next(nextValue)
						}
					} catch (err) {
						subscriber.error(err)
					}
				},
				err => subscriber.error(err),
				() => subscriber.complete(),
			),
		)
}

export function pipelineStepTransform<T, K>(
	transform: Transformer<T, K>,
	emitValue: Predicate<K> = () => true,
) {
	return (data: T[]) => {
		const result: K[] = []
		data.forEach(d => {
			const next = transform(d)
			if (emitValue(next)) {
				result.push(next)
			}
		})
		return result
	}
}

export function pipelineStepCalculation<T, K>(transform: Transformer<T, K>) {
	let result: K
	return (data: T[]) => {
		data.forEach(d => (result = transform(d)))
		return result
	}
}

export type Transformer<In, Out> = (value: In) => Out
export type StepCreator<T, K, X> = (
	transform: Transformer<T, K>,
	emitValue?: Predicate<K>,
) => X
export type StepCalculator<T,K> = (in: T[]) => K
export type StepTransformer<T,K> = (in: T[]) => K[]

