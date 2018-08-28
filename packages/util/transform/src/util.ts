import { FieldAccessor, Compare, CompareOrder } from './interfaces'

declare var require: any
// tslint:disable-next-line
const get = require('lodash/get')

export function getField(data: any, field: FieldAccessor): any {
	if (typeof field === 'string') {
		return get(data, field)
	} else {
		return field(data)
	}
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
