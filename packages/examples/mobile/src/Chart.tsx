import * as React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-native-svg-renderer'
import { View, Text } from 'react-native'

const pipeline = new VirtualSvgPipeline(new Renderer())
const scenegraph = {
	marktype: 'rect',
	items: [
		{ x: 0, y: 0, width: 100, height: 100, cornerRadius: 3, fill: 'steelblue' },
		{
			x: 25,
			y: 25,
			width: 100,
			height: 100,
			cornerRadius: 5,
			fill: 'firebrick',
			fillOpacity: 0.5,
			stroke: 'green',
			strokeWidth: 4,
			strokeOpacity: 0.8,
			strokeJoin: 'miter',
			strokeCap: 'round',
			strokeDash: [1, 1],
			strokeDashOffset: 2,
		},
		{ x: 50, y: 50, width: 100, height: 100, fill: 'forestgreen' },
	],
}

const rendered = pipeline.handle(scenegraph, {
	width: 500,
	height: 500,
	backgroundColor: 'blue',
})
console.log('RENDERED VIEW', rendered)

const viewStyle = { flex: 1 }
export default () => <View style={viewStyle}>{rendered}</View>
