/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, {
	memo,
	useContext,
	useState,
	useEffect,
	useMemo,
	useCallback,
} from 'react'
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
		const [rendered, builder] = useScene(chartOptions, data)
		return (
			<>
				<SceneBuilderContext.Provider value={builder}>
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

function useScene(chartOptions: ChartOptions, data: Record<string, any>): any {
	const pipeline = useOrchestrator()
	const [frameNode, builder] = useChartScenes(chartOptions)
	const [rendered, setRendered] = useState<any>(null)
	const executeRender = useCallback(() => {
		const renderOutput =
			pipeline && pipeline.renderScene(frameNode.spec, chartOptions, data)
		setRendered(renderOutput)
	}, [chartOptions, data])
	useEffect(() => {
		if (frameNode && pipeline) {
			const subscription = frameNode.onChange.subscribe(cause => {
				console.log('chart spec change', cause, frameNode.spec)
				executeRender()
			})
			executeRender()
			return () => subscription.unsubscribe()
		}
	}, [executeRender, frameNode, pipeline, setRendered])

	return [rendered, builder]
}

function useChartScenes(
	chartOptions: ChartOptions,
): [SceneNodeBuilder, SceneNodeBuilder | undefined] {
	const [builder, setBuilder] = useState<SceneNodeBuilder | undefined>(
		undefined,
	)
	const frameNode = useMemo(
		() =>
			scene(node => {
				setBuilder(node)
				return node
			}, chartOptions),
		[chartOptions],
	)

	return [frameNode, builder]
}

function useOrchestrator() {
	const renderer = useContext(ChartRendererContext)
	return useMemo(() => renderer && new Orchestrator(renderer), [renderer])
}
