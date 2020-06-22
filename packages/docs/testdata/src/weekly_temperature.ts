/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/weekly_temperature.json')

export const scenegraph = parseScene(data)
export const title = 'Weekly Temperature'
export const dimensions = {
	height: 350,
	width: 350,
	origin: [70, 19] as [number, number],
}
