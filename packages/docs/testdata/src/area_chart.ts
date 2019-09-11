/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/area_chart.json')

export const scenegraph = parseScene(data)
export const title = 'Area Chart'
export const dimensions = {
	height: 220,
	width: 700,
	origin: [30, 19] as [number, number],
}
