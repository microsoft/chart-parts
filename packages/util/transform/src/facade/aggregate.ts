/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FieldAccessor } from '../interfaces'
import { DatasetTransform } from './interfaces'

declare const require: any
const {
	aggregate: vegaAggregate,
	collect: vegaCollect,
} = require('vega-transforms')
const { field: vegaField } = require('vega-util')

/**
 * Types of aggregate field operations
 */
export enum AggregateOperation {
	/**
	 * The total count of data objects in the group.
	 */
	count = 'count',
	/**
	 * The count of field values that are not null, undefined or NaN.
	 */
	valid = 'valid',

	/**
	 * The count of null or undefined field values.
	 */
	missing = 'missing',

	/**
	 * The count of distinct field values.
	 */
	distinct = 'distinct',

	/**
	 * The sum of field values.
	 */
	sum = 'sum',

	/**
	 * The mean (average) field value.
	 */
	mean = 'mean',

	/**
	 * The sample variance of field values.
	 */
	variance = 'variance',

	/**
	 * The population variance of field values.
	 */
	variancep = 'variancep',

	/**
	 * The sample standard deviation of field values.
	 */
	stdev = 'stdev',

	/**
	 * The population standard deviation of field values.
	 */
	stdevp = 'stdevp',

	/**
	 * The standard error of field values.
	 */
	stderr = 'stderr',

	/**
	 * 	The median field value.
	 */
	median = 'median',

	/**
	 * The lower quartile boundary of field values.
	 */
	q1 = 'q1',

	/**
	 * The upper quartile boundary of field values.
	 */
	q3 = 'q3',

	/**
	 * The lower boundary of the bootstrapped 95% confidence interval of the mean field value.
	 */
	ci0 = 'ci0',

	/**
	 * The upper boundary of the bootstrapped 95% confidence interval of the mean field value.
	 */
	ci1 = 'ci1',

	/**
	 * The minimum field value.
	 */
	min = 'min',

	/**
	 * The maximum field value.
	 */
	max = 'max',

	/**
	 * An input data object containing the minimum field value.
	 */
	argmin = 'argmin',

	/**
	 * 	An input data object containing the maximum field value.
	 */
	argmax = 'argmax',
}

/**
 * Describes an aggregate computation field. This indicates performing a calculation over a field in a
 * dataset as a new output field
 */
export interface AggregateComputeField {
	op: AggregateOperation
	field?: FieldAccessor
	as?: string
}

/**
 * The aggregate transform groups and summarizes an input data stream to produce a derived output stream.
 * Aggregate transforms can be used to compute counts, sums, averages and other descriptive statistics over
 * groups of data objects.
 */
export interface AggregateBuilder extends DatasetTransform {
	/**
	 * The data fields to group by. If not specified, a single group containing all data objects will be used.
	 * @param fields
	 */
	groupBy(...fields: FieldAccessor[]): AggregateBuilder

	/**
	 * The computed aggregate field specifications
	 * @param fields
	 */
	compute(...fields: AggregateComputeField[]): AggregateBuilder

	/**
	 * Boolean	Indicates if the full cross-product of all groupby values should be included in the aggregate output (default false). If set to true, all possible combinations of groupby field values will be considered and zero count groups will be generated and returned for combinations that do not occur in the data itself. Cross-product output act as if the drop parameter is false. In the case of streaming updates, the number of output groups will increase if new groupby field values are observed; all prior groups will be retained. This parameter can be useful for generating facets that include groups for all possible partitions of the data.
	 * @param value
	 */
	cross(value: boolean): AggregateBuilder

	/**
	 * 	Indicates if empty (zero count) groups should be dropped (default true). When a data stream updates (for example, in response to interactive filtering), aggregation groups may become empty. By default, the group is removed from the output. However, in some cases (such as histograms), one may wish to retain empty groups.
	 */
	drop(value: boolean): AggregateBuilder

	/**
	 *
	 * @param value key	Field	An optional key field used to optimize groupby key calculation. If specified, unique keys for each aggregation cell will not be generated from the groupby fields themselves, but instead use this single key field only. Using a key is helpful to speed up processing in situations where there are multiple groupby fields, but a single field is sufficient to distinguish each aggregation cell. For example, for a histogram it is faster to key solely on a bin0 property, and this is safe when the bin1 property (also included as a groupby field) contains redundant information with respect to grouping. This parameter should be used carefully, and only when one is certain that the key field uniquely distinguishes all combinations of groupby field values.
	 */
	key(value: FieldAccessor): AggregateBuilder
}

export class AggregateBuilderImpl implements AggregateBuilder {
	private groupByFields: FieldAccessor[] = []
	private computeFields: AggregateComputeField[] = []
	private crossValue = false
	private dropValue = true
	private keyValue: FieldAccessor | undefined

	public groupBy(...fields: FieldAccessor[]): AggregateBuilder {
		this.groupByFields = fields
		return this
	}

	public compute(...computeFields: AggregateComputeField[]): AggregateBuilder {
		this.computeFields = computeFields
		return this
	}

	public cross(cross: boolean) {
		this.crossValue = cross
		return this
	}

	public drop(drop: boolean) {
		this.dropValue = drop
		return this
	}

	public key(value: FieldAccessor) {
		this.keyValue = value
		return this
	}

	public build(df: any, from: any) {
		const spec: any = {
			groupby: this.groupByFields.map(c => vegaField(c)),
			fields: this.computeFields.map(c =>
				c.field ? vegaField(c.field) : null,
			),
			ops: this.computeFields.map(c => c.op || null),
			as: this.computeFields.map(c => c.as || null),
			cross: this.crossValue,
			drop: this.dropValue,
			key: this.keyValue,
			pulse: from,
		}

		const agg = df.add(vegaAggregate, spec)
		return df.add(vegaCollect, { pulse: agg })
	}
}

export function aggregate(): AggregateBuilder {
	return new AggregateBuilderImpl()
}
