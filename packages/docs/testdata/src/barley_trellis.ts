/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/barley_trellis.json')

export const scenegraph = parseScene(data)
export const title = 'Barley Trellis'
export const dimensions = {
	height: 1000,
	width: 520,
	origin: [30, 19] as [number, number],
}
