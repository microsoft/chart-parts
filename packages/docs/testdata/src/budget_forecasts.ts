/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
declare const require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../../resources/budget_forecasts.json')

export const scenegraph = parseScene(data)
export const title = 'Budget Forecasts'
export const dimensions = {
	height: 600,
	width: 900,
	origin: [80, 19] as [number, number],
}
