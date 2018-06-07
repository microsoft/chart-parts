import * as React from 'react'
import { Renderer } from '@gog/render-interfaces'
import { SceneBuilder } from '@gog/scenegen'
import { ChartContextProvider } from './ChartContext'
import { VirtualSvgPipeline } from '@gog/core'
import { VSvgNode } from '@gog/vdom-interfaces'

export interface ChartPadding {
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export interface ChartProps<Row> {
	width: number
	height: number
	padding?: number | ChartPadding
	data: Row[]
	renderer: Renderer<VSvgNode, any>
}

export interface ChartState {
	/**
	 * The result of the rendering process
	 */
	rendered: React.ReactNode
}

export class Chart<Row> extends React.Component<ChartProps<Row>, ChartState> {
	private pipeline: VirtualSvgPipeline<React.ReactNode>
	private sceneBuilder: SceneBuilder = new SceneBuilder()

	constructor(props: ChartProps<Row>) {
		super(props)
		this.pipeline = new VirtualSvgPipeline(props.renderer)
		this.state = { rendered: null }
	}

	public shouldComponentUpdate() {
		return true
	}

	public componentDidMount() {
		this.renderMarks()
	}

	public render() {
		return (
			<ChartContextProvider value={this.sceneBuilder}>
				{this.props.children}
				{this.state.rendered}
			</ChartContextProvider>
		)
	}

	private renderMarks() {
		const spec = this.sceneBuilder.build()
		const rendered = this.pipeline.handleData(this.props.data, spec, {
			width: this.props.width,
			height: this.props.height,
		})
		this.setState({ rendered })
	}

	private get topPadding() {
		return this.getPadding('top')
	}

	private get leftPadding() {
		return this.getPadding('left')
	}

	private get bottomPadding() {
		return this.getPadding('bottom')
	}

	private get rightPadding() {
		return this.getPadding('right')
	}

	private getPadding(name: string) {
		if (typeof this.props.padding === 'object') {
			return (this.props.padding as any)[name] || 0
		} else {
			return this.props.padding || 0
		}
	}
}
