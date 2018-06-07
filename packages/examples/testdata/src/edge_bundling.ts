// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
import { SGMark } from '@gog/scenegraph-interfaces'
const data = require('../resources/edge_bundling.json')

export const scenegraph = parseScene(data)
export const title = 'Edge Bundling'
export const dimensions = {
	height: 700,
	width: 700,
	origin: [30, 19] as [number, number],
}
