/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Orchestrator } from '@chart-parts/orchestrator'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { FC } from 'react'

const pipeline = new Orchestrator(new Renderer())
export interface SGChartProps {
	data: any
	width?: number
	height?: number
	origin?: [number, number]
}
export const SGChart: FC<SGChartProps> = ({
	data,
	width = 200,
	height = 200,
	origin = [0, 0] as [number, number],
}) => pipeline.renderScenegraph(data, { width, height, origin })
