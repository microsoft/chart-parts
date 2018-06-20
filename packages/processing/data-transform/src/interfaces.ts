export type FieldAccessor = (row: any) => number

export enum CompareOrder {
	ascending = 'asc',
	descending = 'desc',
}

export interface Compare {
	field: FieldAccessor
	order: CompareOrder
}

export enum Offset {
	zero = 'zero',
	center = 'center',
	normalize = 'normalize',
}

export function createSorter(sorts: Compare[]) {
	return (a: any, b: any) => {
		let result = 0
		for (const sort of sorts) {
			const { order, field } = sort
			const valueA = field(a)
			const valueB = field(b)
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
