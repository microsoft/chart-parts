// Bar Chart Example, captured from https://vega.github.io/vega/examples/bar-chart/

// tslint:disable no-var-requires
declare var require: any
import { parseScene } from '@markable/scenegraph'
const data = require('../resources/word_cloud.json')

export const scenegraph = parseScene(data)
export const title = 'Word Cloud'
export const dimensions = {
	height: 700,
	width: 700,
	origin: [70, 19] as [number, number],
}
