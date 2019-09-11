/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/scatter_plot_null_values.json')

export const scenegraph = parseScene(data)
export const title = 'Scatter Plot Null Values'
export const dimensions = {
	height: 550,
	width: 550,
	origin: [30, 19] as [number, number],
}
