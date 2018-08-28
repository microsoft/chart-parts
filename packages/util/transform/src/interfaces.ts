export type FieldAccessor = string | ((row: any) => number)

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

export function defaultComparator<T>(a: T, b: T) {
	return ((a as any) as number) - ((b as any) as number)
}

export type MaybeNumber = number | undefined
