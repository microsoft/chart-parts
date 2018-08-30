import { getField, createOperator } from './util'
import { FieldAccessor } from './interfaces'

/**
 * Internal interface for a grouped data result
 */
export interface GroupedData<T> {
	groups: Map<string, Set<T>>
	groupKeys: Map<string, Partial<T>>
}

/**
 * Internal GroupBy
 */
export function groupBy<T>(...fields: FieldAccessor[]) {
	const getKey = keyGetter(fields)
	const getKeyObject = keyObjectGetter(fields)

	function transform(rows: T[]) {
		const groups = new Map<string, Set<T>>()
		const groupKeys = new Map<string, Partial<T>>()

		// Find the group for each row
		// tslint:disable-next-line
		if (rows && rows.length > 0) {
			rows.forEach(row => {
				const key = getKey(row)
				if (!groups.has(key)) {
					const keyObject = getKeyObject(row)
					groups.set(key, new Set())
					groupKeys.set(key, keyObject)
				}
				const group = groups.get(key) as Set<T>
				group.add(row)
			})
		}
		return { groups, groupKeys }
	}

	return createOperator<T[], T[], GroupedData<T>>({ transform })
}

const keyGetter = (fields: FieldAccessor[]) => (d: any) =>
	fields.length === 0
		? 'default_group'
		: fields.map(f => getField(d, f)).join('::')

const keyObjectGetter = <T>(fields: FieldAccessor[]) => (d: T) => {
	const keyObject: { [key: string]: any } & Partial<T> = {}
	fields.forEach(field => {
		const value = getField(d, field)
		keyObject[field] = value
	})
	return keyObject
}
