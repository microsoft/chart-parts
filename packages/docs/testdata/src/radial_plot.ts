/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/radial_plot.json')

export const scenegraph = parseScene(data)
export const title = 'Radial Plot'
export const dimensions = {
	height: 400,
	width: 400,
	origin: [30, 19] as [number, number],
}
