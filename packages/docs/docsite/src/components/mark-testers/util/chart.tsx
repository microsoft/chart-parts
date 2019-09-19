/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { useState, useMemo, useEffect } from 'react'
import { Orchestrator } from '@chart-parts/orchestrator'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { useDebouncedCallback } from 'use-debounce'

const pipeline = new Orchestrator(new Renderer())
export interface SGChartProps {
	data: any
	width?: number
	height?: number
	origin?: [number, number]
}
export const SGChart: React.FC<SGChartProps> = ({
	data,
	width = 200,
	height = 200,
	origin = [0, 0] as [number, number],
}) => {
	const [rendered, setRendered] = useState<any>(null)
	const params = useMemo(() => ({ width, height, origin }), [
		width,
		height,
		origin,
	])
	const [renderSG] = useDebouncedCallback((data, params) => {
		setRendered(pipeline.renderScenegraph(data, params))
	}, 25)
	useEffect(() => {
		renderSG(data, params)
	}, [data, params])

	return rendered
}
