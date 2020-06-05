/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
import data from '../resources/pie_chart.json'

export const scenegraph = parseScene(data)
export const title = 'Pie Chart'
export const dimensions = {
	height: 400,
	width: 400,
	origin: [30, 19] as [number, number],
}
