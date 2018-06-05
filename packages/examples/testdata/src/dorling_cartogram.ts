// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
import { SGMark } from '@gog/mark-interfaces'
const data = require('../resources/dorling_cartogram.json')

export const scenegraph = parseScene(data)
export const title = 'Dorling Cartogram'
export const dimensions = {
	height: 600,
	width: 600,
	origin: [30, 19] as [number, number],
}
