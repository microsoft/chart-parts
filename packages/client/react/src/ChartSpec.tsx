/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { scene, SceneNodeBuilder } from '@chart-parts/builder'
import { SceneNodeBuilderProvider } from './Context'
import { PaddingObject, ChartOptions } from '@chart-parts/interfaces'

export interface ChartSpecProps {
	width: number
	height: number
	padding?: number | PaddingObject
	onSpecReady: (spec: any) => void
}

export const ChartSpec: React.SFC<ChartSpecProps> = ({
	onSpecReady,
	width,
	height,
	padding,
	children,
}) => {
	let sceneNodeBuilder: SceneNodeBuilder | undefined

	const chartOptions: ChartOptions = { width, height }
	if (padding) {
		chartOptions.padding = padding
	}
	const sceneBuilder = scene(node => (sceneNodeBuilder = node), chartOptions)
	;(React as any).useEffect(() => {
		if (sceneBuilder) {
			onSpecReady(sceneBuilder.build())
		}
	})

	return (
		<SceneNodeBuilderProvider value={sceneNodeBuilder!}>
			{children}
		</SceneNodeBuilderProvider>
	)
}
