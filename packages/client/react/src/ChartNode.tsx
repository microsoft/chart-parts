import * as React from 'react'
import { SceneNodeBuilder } from '@gog/scenegen'
import { SceneNodeBuilderProvider, SceneBuilderConsumer } from './Context'

export class ChartNode extends React.PureComponent<{}> {
	private sceneNodeBuilder: SceneNodeBuilder | undefined

	constructor(props: {}) {
		super(props)
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
