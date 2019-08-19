/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FieldAccessor } from '../interfaces'
import { DatasetTransform } from './interfaces'

declare const require: any
const { bin: vegaBin } = require('vega-transforms')
const { field: vegaField } = require('vega-util')

export interface BinBuilder extends DatasetTransform {
	/**
	 * Sets The data field to bin. (required)
	 * @param field
	 */
	field(field: FieldAccessor): BinBuilder

	/**
	 *  Sets the minimum and maximum values of the bin range. (required)
	 * @param start
	 * @param end
	 */
	extent(start: number, end: number): BinBuilder

	/**
	 * A value in the binned domain at which to anchor the bins, shifting the
	 * bin boundaries if necessary to ensure that a boundary aligns with the
	 * anchor value. By default, the minimum bin extent value serves as the
	 * anchor.
	 * @param value
	 */
	anchor(value: number): BinBuilder

	/**
	 * The maximum number of bins to create (default 20).
	 * @param value
	 */
	maxBins(value: number): BinBuilder

	/**
	 * The number base to use for automatic bin determination (default 10).
	 * @param value
	 */
	base(value: number): BinBuilder

	/**
	 * An exact step size to use between bins. If provided, options such as
	 * maxbins will be ignored.
	 * @param value
	 */
	step(value: number): BinBuilder

	/**
	 * An array of allowable step sizes to choose from.
	 * @param values
	 */
	steps(values: number[]): BinBuilder

	/**
	 * The minimum allowed bin step size (default 0).
	 * @param value
	 */
	minStep(value: number): BinBuilder

	/**
	 * Allowable bin step sub-divisions. The default value is [5, 2], which
	 * indicates that for base 10 numbers (the default base) automatic bin
	 * determination can consider dividing bin step sizes by 5 and/or 2.
	 * @param values
	 */
	divide(values: number[]): BinBuilder

	/**
	 *  If true (the default), attempts to make the bin boundaries use
	 * human-friendly boundaries, such as multiples of ten.
	 * @param value
	 */
	nice(value: boolean): BinBuilder

	/**
	 * The output fields at which to write the start and end bin values.
	 * The default is ["bin0", "bin1"].
	 * @param start
	 * @param end
	 */
	as(start: string, end: string): BinBuilder
}

export class BinBuilderImpl implements BinBuilder {
	private fieldValue: FieldAccessor | undefined
	private extentValue: [number, number] | undefined
	private anchorValue: number | undefined
	private maxBinsValue: number | undefined
	private baseValue: number | undefined
	private stepValue: number | undefined
	private stepsValue: number[] | undefined
	private divideValue: number[] | undefined
	private minStepValue: number | undefined
	private niceValue: boolean | undefined
	private asValue: [string, string] | undefined
	private refValue: ((node: any) => any) | undefined

	public field(value: FieldAccessor) {
		this.fieldValue = value
		return this
	}

	public extent(start: number, end: number) {
		this.extentValue = [start, end]
		return this
	}

	public anchor(value: number) {
		this.anchorValue = value
		return this
	}

	public maxBins(value: number) {
		this.maxBinsValue = value
		return this
	}

	public base(value: number) {
		this.baseValue = value
		return this
	}

	public step(value: number) {
		this.stepValue = value
		return this
	}

	public steps(values: number[]) {
		this.stepsValue = values
		return this
	}

	public minStep(value: number) {
		this.minStepValue = value
		return this
	}

	public divide(values: number[]) {
		this.divideValue = values
		return this
	}

	public nice(value: boolean) {
		this.niceValue = value
		return this
	}

	public as(start: string, end: string) {
		this.asValue = [start, end]
		return this
	}

	public ref(cb: (node: any) => any) {
		this.refValue = cb
		return this
	}

	public build(df: any, from: any) {
		if (this.fieldValue === undefined) {
			throw new Error('field() must be set on bin transform')
		}
		if (this.extentValue === undefined) {
			throw new Error('extent() must be set on bin transform')
		}

		const spec: any = {
			field: vegaField(this.fieldValue),
			extent: this.extentValue,
			pulse: from,
		}
		if (this.anchorValue) {
			spec.anchor = this.anchorValue
		}
		if (this.maxBins) {
			spec.maxbins = this.maxBinsValue
		}
		if (this.baseValue) {
			spec.base = this.baseValue
		}
		if (this.stepValue) {
			spec.step = this.stepValue
		}
		if (this.stepsValue) {
			spec.stepsValue = this.stepsValue
		}
		if (this.minStepValue) {
			spec.minstep = this.minStepValue
		}
		if (this.divideValue) {
			spec.divide = this.divideValue
		}
		if (this.niceValue !== undefined) {
			spec.nice = this.niceValue
		}
		if (this.asValue) {
			spec.as = this.asValue
		}

		const binNode = df.add(vegaBin, spec)
		if (this.refValue) {
			this.refValue(binNode)
		}
		return binNode
	}
}

export function bin(fieldName: FieldAccessor) {
	return new BinBuilderImpl().field(fieldName)
}
