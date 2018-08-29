import { Observable, OperatorFunction } from 'rxjs'
import { groupBy as rxGroupBy } from 'rxjs/operators'
import { FieldAccessor } from '../interfaces'
import { getField } from '../util'

const getKey = (fields: FieldAccessor[]) => (d: any) =>
	fields.map(f => getField(d, f)).join('::')
/**
 * Creates a group-by handling function.
 * @param fields The group-by field specification
 * @param data the incoming data stream. An observable of rows.
 * @return An observable of groups, each group being an observable of rows
 */
export function groupBy$<T>(
	...fields: FieldAccessor[]
): OperatorFunction<T, Observable<T>> {
	return rxGroupBy(getKey(fields))
}

export function groupBy<T>(...fields: FieldAccessor[]) {
	const keyGetter = getKey(fields)
	return (data: T[]) => {
		const groups: T[][] = []
		const groupMap: Map<string, T[]> = new Map()

		data.forEach(d => {
			const key = keyGetter(d)
			if (!groupMap.has(key)) {
				const newGroup: T[] = []
				groupMap.set(key, newGroup)
				groups.push(newGroup)
			}

			const group = groupMap.get(key) as T[]
			group.push(d)
		})
		return groups
	}
}
