import * as React from 'react'
import { Renderer } from '@gog/render-interfaces'
import { SceneBuilder } from '@gog/scenegen'
import { SceneBuilderProvider } from './Context'
import { VirtualSvgPipeline } from '@gog/core'
import { VSvgNode } from '@gog/vdom-interfaces'
import { ChartNode } from './ChartNode'

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
		this.setState({})
	}

	public render() {
		return (
			<SceneBuilderProvider value={this.sceneBuilder}>
				<ChartNode data={this.props.data}>
					{this.props.children}
					{this.renderMarks()}
				</ChartNode>
			</SceneBuilderProvider>
		)
	}

	private renderMarks() {
		const spec = this.sceneBuilder.build()
		const rendered = this.pipeline.handleData(spec, {
			width: this.props.width,
			height: this.props.height,
			padding: this.props.padding,
		})
		return rendered
	}
}
