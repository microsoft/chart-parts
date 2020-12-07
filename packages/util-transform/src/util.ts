/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import get from 'lodash/get'
import { Compare, CompareOrder, FieldAccessor } from './interfaces'

export function getField<T>(data: unknown, field: FieldAccessor): T {
	return get(data, field)
}

export function createSorter<T>(sorts: Compare[]): (a: T, b: T) => number {
	return (a: T, b: T) => {
		let result = 0
		for (const sort of sorts) {
			const { order = CompareOrder.descending, field } = sort
			const valueA = getField(a, field) as number
			const valueB = getField(b, field) as number

			result =
				order === CompareOrder.ascending ? valueA - valueB : valueB - valueA

			if (result !== 0) {
				break
			}
		}
		return result
	}
}

export function identity<T>(t: T): T {
	return t
}

export function defaultComparator<T>(a: T, b: T): number {
	return ((a as any) as number) - ((b as any) as number)
}

export function defaultEquality<T>(a: T, b: T): boolean {
	return a === b
}
