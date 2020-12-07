/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { DatasetManager } from '../dataset'
import { DatasetTransform } from '../interfaces'

export interface DistributionBuilder {
	build(ds: DatasetManager): any
}

/**
 * The density transform generates a new data stream of uniformly-spaced
 * samples drawn from a one-dimensional probability density function (pdf) or
 * cumulative distribution function (cdf). This transform is useful for
 * representing probability distributions and generating continuous
 * distributions from discrete samples using kernel density estimation.
 */
export interface DensityBuilder extends DatasetTransform {
	/**
	 * Required. An object describing the distribution type and parameters.
	 * See the distribution reference for more.
	 *
	 * @param dist
	 */
	distribution(dist: DistributionBuilder): DensityBuilder

	/**
	 * A [min, max] domain from which to sample the distribution. This argument
	 * is required in most cases, but can be omitted in the case of
	 * distributions (namely, kde) that can deduce their own extent.
	 *
	 * @param start
	 * @param end
	 */
	extent(start: number, end: number): DensityBuilder

	/**
	 * The type of distribution to generate.
	 * @param value
	 */
	method(value: DensityMethod): DensityBuilder

	/**
	 * The number of uniformly spaced steps to take along the extent domain
	 * (default 100). A total of steps + 1 uniformly-spaced samples are drawn
	 * from the distribution.
	 *
	 * @param value
	 */
	steps(value: number): DensityBuilder

	/**
	 * The output fields for the sample value and associated probability.
	 * The default is ["value", "density"].
	 *
	 * @param valueString
	 * @param probabilityField
	 */
	as(valueString: string, probabilityField: string): DensityBuilder
}

export enum DensityMethod {
	/**
	 * Probability Density Funciton
	 */
	pdf = 'pdf',

	/**
	 * Cumulative Distribution Function
	 */
	cdf = 'cdf',
}
