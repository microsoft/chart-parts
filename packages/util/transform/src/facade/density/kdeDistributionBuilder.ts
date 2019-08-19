/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FieldAccessor } from '../../interfaces'
import { DistributionBuilder } from './interfaces'
import { DatasetManager } from '../dataset'

declare const require: any
const { field: vegaField } = require('vega-util')

/**
 * Represents a kernel density estimate for a set of numerical values. This
 * method uses a Gaussian kernel to estimate a smoothed, continuous probability
 * distribution.
 */
export interface KdeDistributionBuilder extends DistributionBuilder {
	/**
	 * The name of the data set to analyze.
	 * @param name
	 */
	from(name: string): KdeDistributionBuilder

	/**
	 * The data field containing the values to model.
	 * @param field
	 */
	field(field: FieldAccessor): KdeDistributionBuilder

	/**
	 * An optional parameter that determines the width of the Gaussian kernel.
	 * If set to 0 (the default), the bandwidth value will be automatically
	 * estimated from the input data.
	 * @param value
	 */
	bandwidth(value: number): KdeDistributionBuilder
}

export class KdeDistributionBuilderImpl implements KdeDistributionBuilder {
	private fromValue: string | undefined
	private fieldValue: FieldAccessor | undefined
	private bandwidthValue: number | undefined

	public from(value: string) {
		this.fromValue = value
		return this
	}

	public field(field: FieldAccessor) {
		this.fieldValue = field
		return this
	}

	public bandwidth(value: number) {
		this.bandwidthValue = value
		return this
	}

	public build(ds: DatasetManager) {
		// TODO: wire in source
		if (!this.fromValue) {
			throw new Error('kde distribution must define a source table')
		}
		if (!this.fieldValue) {
			throw new Error('kde distribution must define a field value')
		}
		return {
			function: 'kde',
			from: ds.getTable(this.fromValue),
			field: vegaField(this.fieldValue),
			bandwidth: this.bandwidthValue,
		}
	}
}

export function kde(): KdeDistributionBuilder {
	return new KdeDistributionBuilderImpl()
}
