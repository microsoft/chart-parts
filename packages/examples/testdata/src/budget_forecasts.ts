// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/budget_forecasts.json')

export const scenegraph = parseScene(data)
export const title = 'Budget Forecasts'
export const dimensions = {
	height: 600,
	width: 900,
	origin: [80, 19] as [number, number],
}
