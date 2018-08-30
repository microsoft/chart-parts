import { Observable, OperatorFunction, Subscriber } from 'rxjs'
import { FieldAccessor, Compare, CompareOrder } from './interfaces'

declare var require: any
// tslint:disable-next-line
const get = require('lodash/get')

export function getField(data: any, field: FieldAccessor): any {
	return get(data, field)
}

export function flatMap<T, K>(items: T[], lambda: ((input: T) => K[])): K[] {
	const mappedItems = items.map(lambda)
	return Array.prototype.concat.apply([], mappedItems)
}

export function createSorter(sorts: Compare[]) {
	return (a: any, b: any) => {
		let result = 0
		for (const sort of sorts) {
			const { order = CompareOrder.descending, field } = sort
			const valueA = getField(a, field)
			const valueB = getField(b, field)
			if (order === CompareOrder.ascending) {
				result = valueA - valueB
			}
			if (result !== 0) {
				break
			}
		}
		return result
	}
}

export type Transformer<T, K> = (input: T) => K
export type Predicate<T> = (input: T) => boolean

export interface CreateOperatorContext<Input, Intermediate, Output> {
	transform: Transformer<Intermediate, Output>
	emitValue?: Predicate<Output>
	handleSource?: Transformer<Observable<Input>, Observable<Intermediate>>
}

/**
 * Creates a new RxJS pipeable operator function
 * @param transform Determine the next value in the stream given the current value
 */
export function createOperator<T, I, K>({
	transform,
	emitValue = () => true,
	handleSource = (input: Observable<T>) => (input as any) as Observable<I>,
}: CreateOperatorContext<T, I, K>): OperatorFunction<T, K> {
	return (source: Observable<T>) =>
		Observable.create((subscriber: Subscriber<K>) =>
			handleSource(source).subscribe(
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
