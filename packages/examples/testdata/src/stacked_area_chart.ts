// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@markable/scenegraph'
const data = require('../resources/stacked_area_chart.json')

export const scenegraph = parseScene(data)
export const title = 'Stacked Area Chart'
export const dimensions = {
	height: 220,
	width: 750,
	origin: [30, 19] as [number, number],
}
