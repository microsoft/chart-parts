/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FieldAccessor, Compare, Offset } from '../interfaces'
import { DatasetTransform } from './interfaces'
import { createSorter } from '../util'

declare const require: any
const { stack: vegaStack } = require('vega-encode')
const { field: vegaField } = require('vega-util')

/**
 * The stack transform computes a layout by stacking groups of values.
 * The most common use case is to create stacked graphs, including
 * stacked bar charts and stream graphs. This transform writes two
 * properties to each datum, indicating the starting and ending stack values.
 */
export interface StackBuilder extends DatasetTransform {
	/**
	 * The data field that determines the stack heights.
	 * @param field
	 */
	field(field: string): StackBuilder

	/**
	 * An array of fields by which to partition the data
	 * into separate stacks.
	 * @param fields
	 */
	groupBy(...fields: FieldAccessor[]): StackBuilder

	/**
	 * Criteria for sorting values within each stack.
	 * @param compare
	 */
	sort(...compare: Compare[]): StackBuilder

	/**
	 * The baseline offset. One of “zero” (default), “center”, or “normalize”.
	 * The “center” offset will center the stacks. The “normalize” offset will
	 * compute percentage values for each stack point, with output values in
	 * the range [0,1].
	 *
	 * @param offset
	 */
	offset(offset: Offset): StackBuilder

	/**
	 * The output fields for the computed start and end stack values. The
	 * default is ["y0", "y1"].
	 *
	 * @param start
	 * @param end
	 */
	as(start: string, end: string): StackBuilder
}

export class StackBuilderImpl implements StackBuilder {
	private groupByFields: FieldAccessor[] | undefined
	private compareValue: Compare[] | undefined
	private offsetValue: Offset | undefined
	private asValue: [string, string] | undefined
	private stackField: string | undefined

	public field(value: string) {
		this.stackField = value
		return this
	}

	public groupBy(...fields: FieldAccessor[]) {
		this.groupByFields = fields
		return this
	}

	public sort(...compare: Compare[]) {
		this.compareValue = compare
		return this
	}

	public offset(offset: Offset) {
		this.offsetValue = offset
		return this
	}

	public as(start: string, end: string) {
		this.asValue = [start, end]
		return this
	}

	public build(df: any, from: any) {
		const spec: any = {
			field: vegaField(this.stackField),
			offset: this.offsetValue,
			pulse: from,
		}

		if (this.groupByFields) {
			spec.groupby = this.groupByFields.map(c => vegaField(c))
		}
		if (this.compareValue !== undefined) {
			spec.sort = createSorter(this.compareValue)
		}
		if (this.asValue) {
			spec.as = this.asValue
		}

		const stackNode = df.add(vegaStack, spec)
		return stackNode
	}
}

export function stack(stackField: FieldAccessor): StackBuilder {
	return new StackBuilderImpl().field(stackField)
}
