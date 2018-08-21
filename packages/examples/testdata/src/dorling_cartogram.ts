// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@markable/scenegraph'
const data = require('../resources/dorling_cartogram.json')

export const scenegraph = parseScene(data)
export const title = 'Dorling Cartogram'
export const dimensions = {
	height: 600,
	width: 900,
	origin: [30, 19] as [number, number],
}
