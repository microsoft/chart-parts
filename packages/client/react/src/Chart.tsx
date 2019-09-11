/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useState, useEffect, useCallback, useMemo } from 'react'
import { Renderer, VSvgNode, SceneNode } from '@chart-parts/interfaces'
import { Orchestrator } from '@chart-parts/orchestrator'
import { ChartSpec } from './ChartSpec'

export interface ChartPadding {
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export interface ChartProps {
	width: number
	height: number
	padding?: number | ChartPadding
	data: { [key: string]: any[] }
	// TODO: Replace with Context
	renderer: Renderer<VSvgNode, any>
	scene?: SceneNode
	title?: string
	description?: string
}

export interface ChartState {
	/**
	 * The result of the rendering process
	 */
	rendered: React.ReactNode
}

export const Chart: React.FC<ChartProps> = memo(
	({ renderer, data, children, ...props }) => {
		const [rendered, setRendered] = useState(null)
		const pipeline = useMemo(() => new Orchestrator(renderer), [renderer])

		const receiveSpec = useCallback(
			(spec: SceneNode) => {
				const newRendered = pipeline.renderScene(
					spec,
					{
						width: props.width,
						height: props.height,
						padding: props.padding,
						ariaTitle: props.title,
						ariaDescription: props.description,
					},
					data,
				)
				setRendered(newRendered)
			},
			[setRendered],
		)

		useEffect(() => {
			if (props.scene) {
				receiveSpec(props.scene)
			}
		}, [props.scene, receiveSpec])

		return (
			<>
				<ChartSpec {...props} onSpecReady={receiveSpec}>
					{children}
				</ChartSpec>
				{rendered}
			</>
		)
	},
)

Chart.displayName = 'Chart'
