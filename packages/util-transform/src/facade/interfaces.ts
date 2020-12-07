/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { DatasetManager } from './dataset'

export interface DatasetTransform {
	/**
	 * Build the transformation
	 * @param df The vega dataflow instance
	 * @param from The vega-dataflow node that is the parent of this node
	 * @param ds The chart-parts dataset
	 */
	build(df: any, from: any, ds: DatasetManager): any
}
