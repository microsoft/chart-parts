/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { DistributionBuilder } from './interfaces'
import { DatasetManager } from '../dataset'

export interface MixtureDistributionBuilder extends DistributionBuilder {
	/**
	 * An array of distribution definition objects.
	 * @param values
	 */
	distributions(...values: DistributionBuilder[]): MixtureDistributionBuilder

	/**
	 * An optional array of weights for each distribution.If provided, the
	 * values will be normalized to ensure that weights sum to 1. Any
	 * unspecified weight values default to 1 prior to normalization.
	 *
	 * @param values
	 */
	weights(...values: Array<number | undefined>): MixtureDistributionBuilder
}

export class MixtureDistributionBuilderImpl {
	private distributionsValue: DistributionBuilder[] | undefined
	private weightsValue: Array<number | undefined> | undefined

	public distributions(...values: DistributionBuilder[]) {
		this.distributionsValue = values
		return this
	}

	public weights(...values: Array<number | undefined>) {
		this.weightsValue = values
		return this
	}

	public build(ds: DatasetManager) {
		if (!this.distributionsValue) {
			throw new Error('mixture distribution must have inner distributions set')
		}

		return {
			function: 'mixture',
			weights: this.weightsValue,
			distributions: this.distributionsValue.map(d => d.build(ds)),
		}
	}
}

export function mixture(): MixtureDistributionBuilder {
	return new MixtureDistributionBuilderImpl()
}
