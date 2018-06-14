// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/circle_packing.json')

export const scenegraph = parseScene(data)
export const title = 'Circle Packing'
export const dimensions = {
	height: 700,
	width: 700,
	origin: [80, 19] as [number, number],
}
