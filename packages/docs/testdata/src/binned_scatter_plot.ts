/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
import data from '../resources/binned_scatter_plot.json'

export const scenegraph = parseScene(data)
export const title = 'Binned Scatter Plot'
export const dimensions = {
	height: 400,
	width: 550,
	origin: [80, 19] as [number, number],
}
