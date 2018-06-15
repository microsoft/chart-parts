import * as React from 'react'
import { SceneBuilder, SceneNodeBuilder } from '@gog/scenegen'
import { SceneNodeBuilderProvider, SceneBuilderConsumer } from './Context'

export class ChartNode extends React.PureComponent<{}> {
	private sceneBuilder: SceneBuilder | undefined
	private nodeBuilder: SceneNodeBuilder

	constructor(props: {}) {
		super(props)
		this.nodeBuilder = new SceneNodeBuilder()
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
