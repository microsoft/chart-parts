import React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-svg-renderer'
import { barchart } from '@gog/testdata'

const pipeline = new VirtualSvgPipeline(new Renderer())

export default () => (
	<div>
		{pipeline.handle(barchart, { width: 400, height: 220, origin: [30, 19] })}
	</div>
)
