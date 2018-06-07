// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
import { SGMark } from '@gog/scenegraph-interfaces'
const data = require('../resources/barley_trellis.json')

export const scenegraph = parseScene(data)
export const title = 'Barley Trellis'
export const dimensions = {
	height: 1000,
	width: 520,
	origin: [30, 19] as [number, number],
}
