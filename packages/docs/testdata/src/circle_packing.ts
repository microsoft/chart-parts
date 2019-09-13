/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/circle_packing.json')

export const scenegraph = parseScene(data)
export const title = 'Circle Packing'
export const dimensions = {
	height: 700,
	width: 700,
	origin: [80, 19] as [number, number],
}
