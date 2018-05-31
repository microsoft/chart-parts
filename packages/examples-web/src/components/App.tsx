import React from 'react'
import { parseScene } from '@gog/scenegraph'
import { VirtualSvgRenderer } from '@gog/prerender'
import { ReactDomRenderer } from '@gog/renderer-react-dom'

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
const reactDomRenderer = new ReactDomRenderer()

export default () => <div>{reactDomRenderer.render(vdom)}</div>
