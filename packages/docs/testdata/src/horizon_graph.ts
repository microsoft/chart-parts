/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
declare const require: any
const data = require('../../resources/horizon_graph.json')

export const scenegraph = parseScene(data)
export const title = 'Horizon Graph'
export const dimensions = {
	height: 150,
	width: 520,
	origin: [30, 19] as [number, number],
}
