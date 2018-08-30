import { AggregateOperation, AggregateComputeField } from './interfaces'
import { getField } from '../util'
import {
	min,
	max,
	mean,
	sum,
	median,
	variance,
	deviation,
	quantile,
} from 'd3-array'

export function resolveCompute(spec: AggregateComputeField, rows: any[]) {
	const getFieldValue = (d: any) => getField(d, spec.field)
	const getFieldValues = () => rows.map(d => getFieldValue(d))

	switch (spec.op) {
		case AggregateOperation.count: {
			return rows.length
		}
		case AggregateOperation.valid: {
			return getFieldValues().filter(t => !!t).length
		}
		case AggregateOperation.missing: {
			return getFieldValues().filter(t => !t).length
		}
		case AggregateOperation.distinct: {
			const valueSet = new Set()
			getFieldValues()
				.filter(t => !!t)
				.forEach(d => valueSet.add(d))
			return valueSet.size
		}
		case AggregateOperation.sum: {
			return sum(rows, getFieldValue)
		}
		case AggregateOperation.mean: {
			return mean(rows, getFieldValue)
		}
		case AggregateOperation.variance: {
			return variance(rows, getFieldValue)
		}
		case AggregateOperation.stdev: {
			return deviation(rows, getFieldValue)
		}
		case AggregateOperation.median: {
			return median(rows, getFieldValue)
		}
		case AggregateOperation.q1: {
			return quantile(rows, 0.25, getFieldValue)
		}
		case AggregateOperation.q3: {
			return quantile(rows, 0.75, getFieldValue)
		}
		case AggregateOperation.min: {
			return min(rows, getFieldValue)
		}
		case AggregateOperation.max: {
			return max(rows, getFieldValue)
		}
	}
}
