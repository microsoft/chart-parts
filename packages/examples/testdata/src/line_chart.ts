// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
import { SGMark } from '@gog/mark-interfaces'
const data = require('../resources/line_chart.json')

export const scenegraph = parseScene(data)
export const title = 'Line Chart'
export const dimensions = {
	height: 420,
	width: 500,
	origin: [30, 19] as [number, number],
}
