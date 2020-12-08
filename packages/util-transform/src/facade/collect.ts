/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Compare } from '../interfaces'
import { createSorter } from '../util'
import { DatasetTransform } from './interfaces'
const { collect: vegaCollect } = require('vega-transforms')

export interface CollectBuilder extends DatasetTransform {
	/**
	 * A comparator definition for sorting data objects.
	 * @param compare
	 */
	sort(...compare: Compare[]): CollectBuilder
}

export class CollectBuilderImpl implements CollectBuilder {
	private compareValue: Compare[] | undefined

	public sort(...compare: Compare[]): CollectBuilder {
		this.compareValue = compare
		return this
	}

	public build(df: any, from: any): CollectBuilder {
		const spec: any = {
			pulse: from,
		}

		if (this.compareValue !== undefined) {
			spec.sort = createSorter(this.compareValue)
		}

		return df.add(vegaCollect, spec)
	}
}

export function collect(): CollectBuilder {
	return new CollectBuilderImpl()
}
