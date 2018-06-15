// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/parallel_coordinates.json')

export const scenegraph = parseScene(data)
export const title = 'Parallel Coordinates'
export const dimensions = {
	height: 700,
	width: 700,
	origin: [30, 19] as [number, number],
}
