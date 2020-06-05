/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
import data from '../resources/error_bars.json'

export const scenegraph = parseScene(data)
export const title = 'Error Bars'
export const dimensions = {
	height: 400,
	width: 400,
	origin: [85, 19] as [number, number],
}
