import * as React from 'react'
import { SceneBuilder, SceneNodeBuilder } from '@gog/scenegen'
import { SceneNodeBuilderProvider, SceneBuilderConsumer } from './Context'

export interface ChartNodeProps {
	data: any[]
}

export class ChartNode extends React.PureComponent<ChartNodeProps> {
	private sceneBuilder: SceneBuilder | undefined
	private nodeBuilder: SceneNodeBuilder

	constructor(props: ChartNodeProps) {
		super(props)
		this.nodeBuilder = new SceneNodeBuilder(props.data)
	}

	public componentDidUpdate(props: ChartNodeProps) {
		this.nodeBuilder.setData(props.data)
	}

	public componentDidMount() {
		if (!this.sceneBuilder) {
			throw new Error('expected API to be present')
		}
		this.sceneBuilder.addNode(this.nodeBuilder)
	}

	public render() {
		return (
			<SceneBuilderConsumer>
				{sceneBuilder => {
					this.sceneBuilder = sceneBuilder
					return (
						<SceneNodeBuilderProvider value={this.nodeBuilder}>
							{this.props.children}
						</SceneNodeBuilderProvider>
					)
				}}
			</SceneBuilderConsumer>
		)
	}
}
