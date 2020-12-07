/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/world_map.json')

export const scenegraph = parseScene(data)
export const title = 'World Map'
export const dimensions = {
	height: 700,
	width: 550,
	origin: [70, 19] as [number, number],
}
