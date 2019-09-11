/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { memo, useMemo, useEffect, useState } from 'react'
import { scene, SceneNodeBuilder } from '@chart-parts/builder'
import { SceneNodeBuilderContext } from './Context'
import { PaddingObject, ChartOptions } from '@chart-parts/interfaces'

export interface ChartSpecProps {
	width: number
	height: number
	padding?: number | PaddingObject
	onSpecReady: (spec: any) => void
}

export const ChartSpec: React.FC<ChartSpecProps> = memo(
	({ width, height, padding, onSpecReady, children }) => {
		const [sceneNodeBuilder, setSceneNodeBuilder] = useState<
			SceneNodeBuilder | undefined
		>(undefined)
		const chartOptions = useMemo(() => {
			const opts: ChartOptions = { width, height }
			if (padding) {
				opts.padding = padding
			}
			return opts
		}, [width, height, padding])

		const sceneBuilder = useMemo(() => {
			return scene(node => {
				setSceneNodeBuilder(node)
				return node
			}, chartOptions)
		}, [chartOptions])

		useEffect(() => {
			if (sceneBuilder) {
				const spec = sceneBuilder.build()
				onSpecReady(spec)
			}
		})

		return (
			<SceneNodeBuilderContext.Provider
				value={sceneNodeBuilder as SceneNodeBuilder}
			>
				{children}
			</SceneNodeBuilderContext.Provider>
		)
	},
)

ChartSpec.displayName = 'ChartSpec'
