/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/wheat_and_wages.json')

export const scenegraph = parseScene(data)
export const title = 'Wheat and Wages'
export const dimensions = {
	height: 600,
	width: 1000,
	origin: [70, 19] as [number, number],
}
