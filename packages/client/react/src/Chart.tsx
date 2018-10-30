/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// tslint:disable
import * as React from 'react'
import { Renderer, VSvgNode, SceneNode } from '@chart-parts/interfaces'
import { Orchestrator } from '@chart-parts/orchestrator'
import { ChartSpec } from './ChartSpec'
// const { useState, useEffect, memo } = React as any

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

export const Chart: React.SFC<ChartProps> = ({
	renderer,
	data,
	scene,
	width,
	height,
	padding,
	title,
	description,
	...props
}) => {
	const [rendered, setRendered] = (React as any)
		.useState(null)(React as any)
		.useEffect(() => {
			if (scene) {
				receiveSpec(scene)
			}
		})

	const pipeline = new Orchestrator(renderer)

	/**
	 * Handle scene specification updates, and sets the "rendered chart" state in response
	 */
	function receiveSpec(sceneSpec: SceneNode) {
		const renderedScene = pipeline.renderScene(
			sceneSpec,
			{
				width,
				height,
				padding,
				ariaTitle: title,
				ariaDescription: description,
			},
			data,
		)
		setRendered(renderedScene)
	}

	return (
		<>
			<ChartSpec
				{...props}
				onSpecReady={receiveSpec}
				width={width}
				height={height}
				padding={padding}
			/>
			{rendered}
		</>
	)
}
