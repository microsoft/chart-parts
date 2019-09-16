/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useContext, useState, useEffect, useMemo } from 'react'
import { SceneNode, ChartOptions } from '@chart-parts/interfaces'
import { Orchestrator } from '@chart-parts/orchestrator'
import { SceneNodeBuilder, scene } from '@chart-parts/builder'
import { SceneBuilderContext, ChartRendererContext } from './Context'

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
	({ data, children, width, height, padding, title, description }) => {
		const chartOptions = useChartOptions(
			width,
			height,
			padding,
			title,
			description,
		)
		const [SceneNodeBuilder, sceneNode] = useScene(chartOptions)
		const rendered = useSceneRendering(sceneNode, chartOptions, data)
		return (
			<>
				<SceneBuilderContext.Provider value={SceneNodeBuilder}>
					{children}
				</SceneBuilderContext.Provider>
				{rendered}
			</>
		)
	},
)

Chart.displayName = 'Chart'

function useChartOptions(
	width: number,
	height: number,
	padding: ChartPadding | number | undefined,
	title: string | undefined,
	description: string | undefined,
): ChartOptions {
	return useMemo(() => {
		const opts: ChartOptions = { width, height }
		if (padding) {
			opts.padding = padding
		}
		if (title) {
			opts.ariaTitle = title
		}
		if (description) {
			opts.ariaDescription = description
		}
		return opts
	}, [width, height, padding])
}

function useScene(
	chartOptions: ChartOptions,
): [SceneNodeBuilder | undefined, SceneNode | undefined] {
	const [frameNode, SceneNodeBuilder] = useChartScenes(chartOptions)
	const [builtScene, setBuiltScene] = useState<SceneNode | undefined>()
	useEffect(() => {
		if (frameNode) {
			setBuiltScene(frameNode.build())
			const subscription = frameNode.onChange.subscribe(() => {
				const newScene = frameNode.build()
				setBuiltScene(newScene)
			})
			return () => subscription.unsubscribe()
		}
	}, [frameNode])

	return [SceneNodeBuilder, builtScene]
}

function useChartScenes(
	chartOptions: ChartOptions,
): [SceneNodeBuilder, SceneNodeBuilder] {
	const [SceneNodeBuilder, setSceneBuilder] = useState<
		SceneNodeBuilder | undefined
	>(undefined)
	const frameNode = useMemo(
		() =>
			scene(node => {
				setSceneBuilder(node)
				return node
			}, chartOptions),
		[chartOptions],
	)

	return [frameNode, SceneNodeBuilder!]
}

function useSceneRendering(
	sceneNode: SceneNode | undefined,
	options: ChartOptions,
	data: { [key: string]: any[] },
): any {
	const [rendered, setRendered] = useState<any>(null)
	const pipeline = useOrchestrator()
	useEffect(() => {
		if (sceneNode && pipeline) {
			const renderOutput = pipeline.renderScene(sceneNode, options, data)
			setRendered(renderOutput)
		}
	}, [pipeline, sceneNode])
	return rendered
}

function useOrchestrator() {
	const renderer = useContext(ChartRendererContext)
	return useMemo(() => renderer && new Orchestrator(renderer), [renderer])
}
