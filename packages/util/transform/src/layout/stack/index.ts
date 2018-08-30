import { Observable, OperatorFunction } from 'rxjs'
import { max, sum } from 'd3-array'
import { FieldAccessor, Compare, Offset } from '../../interfaces'
import { createOperator, getField, flatMap } from '../../util'
import { groupBy, GroupedData } from '../../groupBy'
import { getStacker } from './stackers'

export interface StackBuilder<T> extends OperatorFunction<T[], any> {
	sort(...sorts: Compare[]): StackBuilder<T>
	offset(value: Offset): StackBuilder<T>
	output(start: string, end: string): StackBuilder<T>
	groupBy(...fields: FieldAccessor[]): StackBuilder<T>
}

export interface StackBuilderContext {
	sorts: Compare[]
	groupBy: FieldAccessor[]
	offset: Offset
	field: FieldAccessor
	outputFields: [string, string]
}

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function stack<T>(field: FieldAccessor): StackBuilder<T> {
	const context: StackBuilderContext = {
		field,
		groupBy: [],
		sorts: [],
		offset: Offset.zero,
		outputFields: ['y0', 'y1'],
	}

	const getFieldValue = (d: any) => getField(d, context.field)

	function transform(data: GroupedData<T>) {
		const { groups } = data
		function processStacks() {
			const keys = Array.from(groups.keys())
			return keys.map(groupKey => {
				const rows = Array.from(groups.get(groupKey) as any)
				const maxValue = max(rows, getFieldValue)
				const sumValue = sum(rows, getFieldValue)
				const stacker = getStacker(context)
				return stacker(context, rows, sumValue, maxValue as number)
			})
		}

		return flatMap(processStacks(), (t: any) => t)
	}

	const makeStack = createOperator({
		transform,
		handleSource: (input: Observable<T[]>) => {
			return input.pipe(groupBy(...context.groupBy))
		},
	})

	const builder = (makeStack as any) as StackBuilder<T>
	builder.sort = (...sortBy: Compare[]) => {
		context.sorts = sortBy
		return builder
	}
	builder.groupBy = (...fields: FieldAccessor[]) => {
		context.groupBy = fields
		return builder
	}
	builder.offset = (value: Offset) => {
		context.offset = value
		return builder
	}
	builder.output = (start: string, end: string) => {
		context.outputFields = [start, end]
		return builder
	}
	return builder
}
