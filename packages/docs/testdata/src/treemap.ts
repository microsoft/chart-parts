/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/treemap.json')

export const scenegraph = parseScene(data)
export const title = 'Treemap'
export const dimensions = {
	height: 700,
	width: 700,
	origin: [30, 19] as [number, number],
}
