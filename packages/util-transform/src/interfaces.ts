/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export type FieldAccessor = string // | ((row: any) => number)

export enum TextCaseTransform {
	lower = 'lower',
	upper = 'upper',
	mixed = 'mixed',
}

export enum CompareOrder {
	ascending = 'asc',
	descending = 'desc',
}

export interface Compare {
	field: FieldAccessor
	order?: CompareOrder
}

export enum Offset {
	zero = 'zero',
	center = 'center',
	normalize = 'normalize',
}

export type CompareFunction<T> = (a: T, b: T) => number
export type EqualityFunction<T> = (a: T, b: T) => boolean
export type GetKeyFunction<T> = (item: T) => any
export type Predicate<T> = (item: T) => boolean
export type Transformer<T, K> = (input: T) => K

export type MaybeNumber = number | undefined
