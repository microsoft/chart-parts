// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
import { SGMark } from '@gog/mark-interfaces'
const data = require('../resources/horizon_graph.json')

export const scenegraph = parseScene(data)
export const title = 'Horizon Graph'
export const dimensions = {
	height: 150,
	width: 520,
	origin: [30, 19] as [number, number],
}
