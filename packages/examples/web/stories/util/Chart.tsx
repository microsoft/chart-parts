import * as React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-svg-renderer'

const pipeline = new VirtualSvgPipeline(new Renderer())
export interface SGChartProps {
	data: any
	width?: number
	height?: number
	origin?: [number, number]
}
export const SGChart: React.SFC<SGChartProps> = ({
	data,
	width = 200,
	height = 200,
	origin = [0, 0] as [number, number],
}) => pipeline.handleScenegraph(data, { width, height, origin })
