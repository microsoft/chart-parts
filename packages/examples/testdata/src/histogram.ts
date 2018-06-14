// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/histogram.json')

export const scenegraph = parseScene(data)
export const title = 'Histogram'
export const dimensions = {
	height: 200,
	width: 550,
	origin: [30, 19] as [number, number],
}
