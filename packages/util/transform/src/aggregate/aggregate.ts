import { Observable, OperatorFunction } from 'rxjs'
import { FieldAccessor } from '../interfaces'
import {
	AggregateOperation,
	AggregateComputeField,
	AggregateBuilder,
} from './interfaces'
import { resolveCompute } from './resolveCompute'
import { compute } from './compute'
import { groupBy, GroupedData } from '../groupBy'
import { createOperator } from '../util'

interface AggregateContext {
	fields: FieldAccessor[]
	compute: AggregateComputeField[]
}

const DEFAULT_COMPUTES = [compute('count').from(AggregateOperation.count)]

/**
 * Creates a new aggregation-builder instance.
 */
export function aggregate<T>(): AggregateBuilder<T> {
	const context: AggregateContext = {
		fields: [],
		compute: [],
	}

	/**
	 * Transforms a grouped dataset into aggregated data rows
	 * @param param0 the grouped dataset
	 */
	function transform({ groupKeys, groups }: GroupedData<T>) {
		function processAggregation() {
			const keys = Array.from(groups.keys())
			return keys.map(groupKey => {
				const groupRows = Array.from(groups.get(groupKey) as any)
				const keyFields = groupKeys.get(groupKey) as any
				const computedFields = computeAggregatedFields(groupRows)
				return { ...keyFields, ...computedFields }
			})
		}
		function computeAggregatedFields(groupRows: any[]) {
			const result: any = {}
			const computes: AggregateComputeField[] =
				context.compute.length > 0 ? context.compute : DEFAULT_COMPUTES
			computes.forEach(cf => {
				try {
					const computedValue = resolveCompute(cf, groupRows)
					result[cf.as] = computedValue
				} catch (err) {
					// tslint:disable-next-line no-console
					console.log(`error computing ${cf.as}`, err)
				}
			})
			return result
		}

		return processAggregation()
	}

	//
	// Create the RxJS Pipeline Operator
	//
	const makeAggregate = createOperator({
		transform,
		handleSource: (input: Observable<T[]>) =>
			input.pipe(groupBy(...context.fields)),
	})

	const builder = (makeAggregate as any) as AggregateBuilder<T> &
		OperatorFunction<T, any>

	builder.groupBy = (...fields: FieldAccessor[]) => {
		context.fields = fields
		return builder
	}
	builder.compute = (...computeFields: AggregateComputeField[]) => {
		context.compute = computeFields
		return builder
	}
	return builder
}
