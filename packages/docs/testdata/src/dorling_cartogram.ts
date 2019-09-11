/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/dorling_cartogram.json')

export const scenegraph = parseScene(data)
export const title = 'Dorling Cartogram'
export const dimensions = {
	height: 600,
	width: 900,
	origin: [30, 19] as [number, number],
}
