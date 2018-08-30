import { from } from 'rxjs'
import { toArray } from 'rxjs/operators'
import { aggregate, compute, AggregateOperation } from '../index'

describe('The Aggregate Operation', () => {
	it('can perform a basic aggregation without a groupby', async () => {
		const data = [
			[
				{ foo: 1, bar: 1 },
				{ foo: 1, bar: 2 },
				{ foo: null, bar: 3 },
				{ foo: NaN, bar: null },
				{ foo: undefined, bar: null },
			],
		]

		const outputs: any[] = await from(data)
			.pipe(
				aggregate().compute(
					compute('valid').from(AggregateOperation.valid, 'foo'),
					compute('missing').from(AggregateOperation.missing, 'foo'),
					compute('sum').from(AggregateOperation.sum, 'bar'),
					compute('median').from(AggregateOperation.median, 'bar'),
					compute('count').from(AggregateOperation.count, 'foo'),
					compute('mean').from(AggregateOperation.mean, 'foo'),
					compute('distinct').from(AggregateOperation.distinct, 'bar'),
					compute('distinctF').from(AggregateOperation.distinct, 'foo'),
					compute('variance').from(AggregateOperation.variance, 'bar'),
					compute('stdev').from(AggregateOperation.stdev, 'bar'),
					compute('q1').from(AggregateOperation.q1, 'bar'),
					compute('q3').from(AggregateOperation.q3, 'bar'),
					compute('min').from(AggregateOperation.min, 'bar'),
					compute('max').from(AggregateOperation.max, 'bar'),
				),
				toArray(),
			)
			.toPromise()

		expect(outputs.length).toEqual(1)
		expect(outputs[0]).toEqual([
			{
				valid: 2,
				distinct: 3,
				distinctF: 1,
				missing: 3,
				sum: 6,
				median: 2,
				mean: 1,
				count: 5,
				variance: 1,
				stdev: 1,
				q1: 2,
				q3: 0,
				min: 1,
				max: 3,
			},
		])
	})
})
