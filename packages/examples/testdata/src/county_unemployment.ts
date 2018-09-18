// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@chart-parts/scenegraph'
const data = require('../resources/county_unemployment.json')

export const scenegraph = parseScene(data)
export const title = 'County Unemployment'
export const dimensions = {
	height: 500,
	width: 500,
	origin: [30, 19] as [number, number],
}
