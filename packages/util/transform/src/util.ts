import { Compare, CompareOrder, FieldAccessor } from './interfaces'
declare var require: any

// tslint:disable-next-line
const get = require('lodash/get')

export function getField(data: any, field: FieldAccessor): any {
	return get(data, field)
}

export function createSorter(...sorts: Compare[]) {
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

export function identity<T>(t: T) {
	return t
}

export function defaultComparator<T>(a: T, b: T) {
	return ((a as any) as number) - ((b as any) as number)
}

export function defaultEquality<T>(a: T, b: T) {
	return a === b
}
