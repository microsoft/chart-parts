/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/tree_layout.json')

export const scenegraph = parseScene(data)
export const title = 'Tree Layout'
export const dimensions = {
	height: 1500,
	width: 550,
	origin: [90, 19] as [number, number],
}
