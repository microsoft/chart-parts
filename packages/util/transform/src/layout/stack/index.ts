import {
	Observable,
	OperatorFunction,
	Subscriber,
	isObservable,
	zip,
} from 'rxjs'
import { takeLast, toArray } from 'rxjs/operators'
import { FieldAccessor, Compare, Offset } from '../../interfaces'
import { max } from '../../computations/max'
import { sum } from '../../computations/sum'
import { accessField } from '../../computations/accessField'
import { getStacker } from './stackers'

export interface StackBuilder extends OperatorFunction<Observable<any>, any> {
	sort(...sorts: Compare[]): StackBuilder
	offset(value: Offset): StackBuilder
	output(start: string, end: string): StackBuilder
}

export interface StackBuilderContext {
	sorts: Compare[]
	offset: Offset
	field: FieldAccessor
	outputFields: [string, string]
}

/**
 * Creates an observable node based on incoming number stream
 * @param source An observable of numbers to emit the maximum value of
 */
export function stack(field: FieldAccessor) {
	const context: StackBuilderContext = {
		field,
		sorts: [],
		offset: Offset.zero,
		outputFields: ['y0', 'y1'],
	}

	function makeStack(source: Observable<Observable<any>>) {
		return Observable.create((subscriber: Subscriber<any>) =>
			source.subscribe(
				group => {
					if (!isObservable(group)) {
						subscriber.error(
							new Error(
								`stack group is not an observable. 
                            You may have forgotten to apply a groupBy() before applying stack()
                            `,
							),
						)
					}
					try {
						processGroup(group, context, outputRow =>
							subscriber.next(outputRow),
						)
					} catch (err) {
						subscriber.error(err)
					}
				},
				err => subscriber.error(err),
				() => subscriber.complete(),
			),
		)
	}

	const builder = makeStack as StackBuilder
	builder.sort = (...sortBy: Compare[]) => {
		context.sorts = sortBy
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

function processGroup(
	group: Observable<any>,
	context: StackBuilderContext,
	handleOutputRow: (row: any) => void,
) {
	const groupMax = group.pipe(
		accessField<number>(context.field),
		max(),
		takeLast(1),
	)
	const groupSum = group.pipe(
		accessField<number>(context.field),
		sum(),
		takeLast(1),
	)
	const groupItems = group.pipe(toArray())
	zip(groupMax, groupSum, groupItems).subscribe(
		([maxValue, sumValue, rows]) => {
			// Apply the stack logic
			getStacker(context)(context, rows, sumValue, maxValue as number)
			rows.forEach(row => handleOutputRow(row))
		},
	)
}
