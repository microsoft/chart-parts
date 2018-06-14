// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
import { parseScene } from '@gog/scenegraph'
const data = require('../resources/u_district_cuisine.json')

export const scenegraph = parseScene(data)
export const title = 'U-District Cuisine'
export const dimensions = {
	height: 800,
	width: 800,
	origin: [30, 19] as [number, number],
}
