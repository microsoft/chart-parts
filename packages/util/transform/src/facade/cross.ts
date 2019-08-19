/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Predicate } from '../interfaces'
import { DatasetTransform } from './interfaces'

declare const require: any
const { cross: vegaCross } = require('vega-transforms')

/**
 * The cross transform compute the cross-product of a data stream with itself.
 */
export interface CrossBuilder extends DatasetTransform {
	/**
	 * An optional filter expression for limiting the results
	 * of the cross-product.
	 * @param value
	 */
	filter(value: Predicate<any>): CrossBuilder

	/**
	 * The output fields for the two data objects being crossed.
	 * The default is ["a", "b"].
	 * @param field1
	 * @param field2
	 */
	as(field1: string, field2: string): CrossBuilder
}

export class CrossBuilderImpl implements CrossBuilder {
	private filterValue: any | undefined
	private asValue: [string, string] | undefined

	public filter(value: any) {
		this.filterValue = value
		return this
	}

	public as(field1: string, field2: string) {
		this.asValue = [field1, field2]
		return this
	}

	public build(df: any, from: any) {
		const spec: any = {
			pulse: from,
		}
		if (this.filterValue) {
			spec.filter = this.filterValue
		}

		if (this.asValue) {
			spec.as = this.asValue
		}

		const crossNode = df.add(vegaCross, spec)
		return crossNode
	}
}

export function cross() {
	return new CrossBuilderImpl()
}
