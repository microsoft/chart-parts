import React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-svg-renderer'
import { BarChart } from '@gog/testdata'

const pipeline = new VirtualSvgPipeline(new Renderer())

export default () => (
	<div>
		{pipeline.handle(BarChart.scenegraph, {
			width: 400,
			height: 220,
			origin: [30, 19],
		})}
	</div>
)
