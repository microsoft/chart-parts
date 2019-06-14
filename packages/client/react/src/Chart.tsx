/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// tslint:disable no-var-requires
import * as React from 'react'
import { Renderer, VSvgNode, SceneNode } from '@chart-parts/interfaces'
import { Orchestrator } from '@chart-parts/orchestrator'
import { ChartSpec } from './ChartSpec'
declare var require: any
const shallowequal = require('shallowequal')

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

export class Chart extends React.Component<ChartProps, ChartState> {
	private pipeline: Orchestrator<React.ReactNode>

	public constructor(props: ChartProps) {
		super(props)
		this.pipeline = new Orchestrator(props.renderer)
		this.state = { rendered: null }
	}

	public shouldComponentUpdate(props: ChartProps, state: ChartState) {
		return !shallowequal(this.props, props) || !shallowequal(this.state, state)
	}

	public componentDidMount() {
		if (this.props.scene) {
			this.receiveSpec(this.props.scene)
		}
	}

	public render() {
		const { renderer, data, ...props } = this.props
		return (
			<>
				<ChartSpec {...props} onSpecReady={this.receiveSpec}>
					{this.props.children}
				</ChartSpec>
				{this.state.rendered}
			</>
		)
	}

	private receiveSpec = (spec: SceneNode) => {
		const rendered = this.pipeline.renderScene(
			spec,
			{
				width: this.props.width,
				height: this.props.height,
				padding: this.props.padding,
				ariaTitle: this.props.title,
				ariaDescription: this.props.description,
			},
			this.props.data,
		)
		this.setState({ rendered })
	}
}
