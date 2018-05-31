import React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-svg-renderer'

const pipeline = new VirtualSvgPipeline(new Renderer())
const scenegraph = {
	marktype: 'rect',
	items: [
		{ x: 0, y: 0, width: 50, height: 50, fill: 'steelblue' },
		{ x: 25, y: 25, width: 50, height: 50, fill: 'firebrick' },
		{ x: 50, y: 50, width: 50, height: 50, fill: 'forestgreen' },
	],
}

export default () => <div>{pipeline.handle(scenegraph)}</div>
