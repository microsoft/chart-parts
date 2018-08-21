// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@markable/scenegraph'
const data = require('../resources/weekly_temperature.json')

export const scenegraph = parseScene(data)
export const title = 'Weekly Temperature'
export const dimensions = {
	height: 350,
	width: 350,
	origin: [70, 19] as [number, number],
}
