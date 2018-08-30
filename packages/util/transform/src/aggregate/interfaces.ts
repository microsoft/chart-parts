import { OperatorFunction } from 'rxjs'
import { FieldAccessor } from '../interfaces'

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
	 * The sample standard deviation of field values.
	 */
	stdev = 'stdev',

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
	 * The minimum field value.
	 */
	min = 'min',

	/**
	 * The maximum field value.
	 */
	max = 'max',
}

/**
 * Describes an aggregate computation field. This indicates performing a calculation over a field in a dataset as a new output field
 */
export interface AggregateComputeField {
	field: FieldAccessor
	op: AggregateOperation
	as: string
}

export interface AggregateBuilder<T> extends OperatorFunction<T[], any> {
	groupBy(...fields: FieldAccessor[]): AggregateBuilder<T>
	compute(...fields: AggregateComputeField[]): AggregateBuilder<T>
}
