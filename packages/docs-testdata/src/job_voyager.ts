/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/job_voyager.json')

export const scenegraph = parseScene(data)
export const title = 'Job Voyager'
export const dimensions = {
	height: 500,
	width: 500,
	origin: [30, 19] as [number, number],
}
