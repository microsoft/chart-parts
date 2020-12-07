/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DistributionBuilder } from './interfaces'

/**
 * Represents a continuous uniform probability distribution
 * over the interval [min, max).
 */
export interface UniformDistributionBuilder extends DistributionBuilder {
	/**
	 * The minimum value (default 0).
	 * @param value
	 */
	min(value: number): UniformDistributionBuilder

	/**
	 * The maximum value (default 1).
	 * @param value
	 */
	max(value: number): UniformDistributionBuilder
}

export class UniformDistributionBuilderImpl
	implements UniformDistributionBuilder {
	private minValue: number | undefined
	private maxValue: number | undefined

	public min(value: number) {
		this.minValue = value
		return this
	}

	public max(value: number) {
		this.maxValue = value
		return this
	}

	public build() {
		return {
			function: 'uniform',
			min: this.minValue,
			max: this.maxValue,
		}
	}
}

export function uniform(): UniformDistributionBuilder {
	return new UniformDistributionBuilderImpl()
}
