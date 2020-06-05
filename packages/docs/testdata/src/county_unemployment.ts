/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
import data from '../resources/county_unemployment.json'

export const scenegraph = parseScene(data)
export const title = 'County Unemployment'
export const dimensions = {
	height: 500,
	width: 500,
	origin: [30, 19] as [number, number],
}
