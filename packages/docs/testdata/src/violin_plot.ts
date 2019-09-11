/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/violin_plot.json')

export const scenegraph = parseScene(data)
export const title = 'Violin Plot'
export const dimensions = {
	height: 450,
	width: 450,
	origin: [70, 19] as [number, number],
}
