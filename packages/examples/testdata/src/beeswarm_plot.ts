// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/beeswarm_plot.json')

export const scenegraph = parseScene(data)
export const title = 'Beeswarm Plot'
export const dimensions = {
	height: 400,
	width: 700,
	origin: [30, 19] as [number, number],
}
