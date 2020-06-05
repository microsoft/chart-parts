/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
import data from '../resources/histogram_null_values.json'

export const scenegraph = parseScene(data)
export const title = 'Histogram Null Values'
export const dimensions = {
	height: 200,
	width: 550,
	origin: [30, 19] as [number, number],
}
