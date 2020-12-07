/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import { DatasetManager } from '../dataset'
import {
	DensityBuilder,
	DensityMethod,
	DistributionBuilder,
} from './interfaces'

const { density: vegaDensity } = require('vega-transforms')

export class DensityBuilderImpl implements DensityBuilder {
	private distributionValue: DistributionBuilder | undefined
	private extentValue: [number, number] | undefined
	private methodValue: DensityMethod | undefined
	private stepsValue: number | undefined
	private asValue: [string, string] | undefined

	public distribution(value: DistributionBuilder): DensityBuilder {
		this.distributionValue = value
		return this
	}

	public extent(start: number, end: number): DensityBuilder {
		this.extentValue = [start, end]
		return this
	}

	public method(value: DensityMethod): DensityBuilder {
		this.methodValue = value
		return this
	}

	public steps(value: number): DensityBuilder {
		this.stepsValue = value
		return this
	}

	public as(valueString: string, probabilityField: string): DensityBuilder {
		this.asValue = [valueString, probabilityField]
		return this
	}

	public build(df: any, from: any, ds: DatasetManager) {
		if (!this.distributionValue) {
			throw new Error('density distribution() must be defined')
		}

		const spec: any = {
			distribution: this.distributionValue.build(ds),
			pulse: from,
		}

		if (this.extentValue) {
			spec.extent = this.extentValue
		}
		if (this.methodValue) {
			spec.method = this.methodValue
		}
		if (this.stepsValue) {
			spec.steps = this.stepsValue
		}
		if (this.asValue) {
			spec.as = this.asValue
		}

		return df.add(vegaDensity, spec)
	}
}

export function density(): DensityBuilder {
	return new DensityBuilderImpl()
}
