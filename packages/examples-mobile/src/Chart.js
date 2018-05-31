import React from 'react'
import { parseScene } from '@gog/scenegraph'
import { parseScene, VirtualSvgRenderer } from '@gog/prerender'
import { ReactNativeSvgRenderer } from '@gog/renderer-react-native-svg'
import { View } from 'react-native'

const virtualSvgRenderer = new VirtualSvgRenderer()
const scene = parseScene({
	marktype: 'rect',
	items: [
		{ x: 0, y: 0, width: 50, height: 50, fill: 'steelblue' },
		{ x: 25, y: 25, width: 50, height: 50, fill: 'firebrick' },
		{ x: 50, y: 50, width: 50, height: 50, fill: 'forestgreen' },
	],
})
const vdom = virtualSvgRenderer.render(scene, {
	origin: [0, 0],
	backgroundColor: 'transparent',
	scale: 1,
	width: 250,
	height: 250,
})
const renderer = new ReactNativeSvgRenderer()

export default () => <View style={{ flex: 1 }}>{renderer.render(vdom)}</View>
