/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/earthquakes.json')

export const scenegraph = parseScene(data)
export const title = 'Earthquakes'
export const dimensions = {
	height: 600,
	width: 600,
	origin: [30, 19] as [number, number],
}
