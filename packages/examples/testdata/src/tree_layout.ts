// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/tree_layout.json')

export const scenegraph = parseScene(data)
export const title = 'Tree Layout'
export const dimensions = {
	height: 1500,
	width: 550,
	origin: [90, 19] as [number, number],
}
