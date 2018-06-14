// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/wheat_and_wages.json')

export const scenegraph = parseScene(data)
export const title = 'Wheat and Wages'
export const dimensions = {
	height: 600,
	width: 1000,
	origin: [70, 19] as [number, number],
}
