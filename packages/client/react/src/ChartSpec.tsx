/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as React from 'react'
import { scene, SceneNodeBuilder } from '@chart-parts/builder'
import { SceneNodeBuilderContext } from './Context'
import { PaddingObject, ChartOptions } from '@chart-parts/interfaces'
export interface ChartSpecProps {
	width: number
	height: number
	padding?: number | PaddingObject
	onSpecReady: (spec: any) => void
}

export class ChartSpec extends React.PureComponent<ChartSpecProps> {
	private sceneBuilder: SceneNodeBuilder | undefined

	public render() {
		let sceneNodeBuilder: SceneNodeBuilder | undefined
		this.sceneBuilder = scene(
			node => (sceneNodeBuilder = node),
			this.chartOptions,
		)
		return (
			<SceneNodeBuilderContext.Provider
				value={sceneNodeBuilder as SceneNodeBuilder}
			>
				{this.props.children}
			</SceneNodeBuilderContext.Provider>
		)
	}

	public componentDidMount() {
		this.updateSpec()
	}

	public componentDidUpdate() {
		return this.updateSpec()
	}

	private get chartOptions(): ChartOptions {
		const opts: ChartOptions = {
			width: this.props.width,
			height: this.props.height,
		}
		if (this.props.padding) {
			opts.padding = this.props.padding
		}
		return opts
	}

	private updateSpec() {
		if (this.sceneBuilder) {
			const spec = this.sceneBuilder.build()
			this.props.onSpecReady(spec)
		}
	}
}
