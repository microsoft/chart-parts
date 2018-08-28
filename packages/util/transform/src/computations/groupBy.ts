import { Observable } from 'rxjs'
import { groupBy } from 'rxjs/operators'
import { FieldAccessor } from '../interfaces'
import { getField } from '../util'

/**
 * Creates a group-by handling function.
 * @param fields The group-by field specification
 * @param data the incoming data stream. An observable of rows.
 * @return An observable of groups, each group being an observable of rows
 */
export default function doGroupBy(
	fields: FieldAccessor[],
	data: Observable<any>,
): Observable<Observable<any>> {
	const getKey = (d: any) => fields.map(f => getField(d, f)).join('::')
	return data.pipe(groupBy(getKey))
}
