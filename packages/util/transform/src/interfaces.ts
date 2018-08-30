export type FieldAccessor = string // | ((row: any) => number)

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

export function identity<T>(t: T) {
	return t
}

export function defaultComparator<T>(a: T, b: T) {
	return ((a as any) as number) - ((b as any) as number)
}

export function defaultEquality<T>(a: T, b: T) {
	return a === b
}

export type MaybeNumber = number | undefined
