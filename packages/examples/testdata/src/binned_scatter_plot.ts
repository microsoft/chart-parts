// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
import { SGMark } from '@gog/scenegraph-interfaces'
const data = require('../resources/binned_scatter_plot.json')

export const scenegraph = parseScene(data)
export const title = 'Binned Scatter Plot'
export const dimensions = {
	height: 400,
	width: 550,
	origin: [80, 19] as [number, number],
}
