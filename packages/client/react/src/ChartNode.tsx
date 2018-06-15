import * as React from 'react'
import { SceneBuilder, SceneNodeBuilder } from '@gog/scenegen'
import { SceneNodeBuilderProvider, SceneBuilderConsumer } from './Context'

export class ChartNode extends React.PureComponent<{}> {
	private sceneBuilder: SceneBuilder | undefined
	private sceneNodeBuilder: SceneNodeBuilder | undefined

	constructor(props: {}) {
		super(props)
	}

	public componentDidMount() {
		if (!this.sceneBuilder) {
			throw new Error('expected API to be present')
		}
		this.sceneNodeBuilder = this.sceneBuilder.push()
	}

	public render() {
		return (
			<SceneBuilderConsumer>
				{sceneBuilder => {
					this.sceneBuilder = sceneBuilder
					this.sceneNodeBuilder = sceneBuilder.push()
					return (
						<SceneNodeBuilderProvider value={this.sceneNodeBuilder}>
							{this.props.children}
						</SceneNodeBuilderProvider>
					)
				}}
			</SceneBuilderConsumer>
		)
	}
}
