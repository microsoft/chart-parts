/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Compare, CompareOrder, FieldAccessor } from './interfaces'
declare const require: any
const get = require('lodash/get')

export function getField(data: any, field: FieldAccessor): any {
	return get(data, field)
}

export function createSorter(sorts: Compare[]) {
	return (a: any, b: any) => {
		let result = 0
		for (const sort of sorts) {
			const { order = CompareOrder.descending, field } = sort
			const valueA = getField(a, field)
			const valueB = getField(b, field)

			result =
				order === CompareOrder.ascending ? valueA - valueB : valueB - valueA

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
