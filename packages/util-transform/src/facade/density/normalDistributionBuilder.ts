/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { DistributionBuilder } from './interfaces'

/**
 * Represents a normal (Gaussian) probability distribution with a
 * specified mean and standard deviation stdev.
 */
export interface NormalDistributionBuilder extends DistributionBuilder {
	/**
	 * The mean of the distribution (default 0).
	 * @param value
	 */
	mean(value: number): NormalDistributionBuilder

	/**
	 * The standard deviation of the distribution (default 1).
	 * @param value
	 */
	stdev(value: number): NormalDistributionBuilder
}

export class NormalDistributionBuilderImpl
	implements NormalDistributionBuilder {
	private meanValue: number | undefined
	private stdevValue: number | undefined

	public mean(value: number) {
		this.meanValue = value
		return this
	}

	public stdev(value: number) {
		this.stdevValue = value
		return this
	}

	public build() {
		return {
			function: 'normal',
			mean: this.meanValue,
			stdev: this.stdevValue,
		}
	}
}

export function normal(): NormalDistributionBuilder {
	return new NormalDistributionBuilderImpl()
}
