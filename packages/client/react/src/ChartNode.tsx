// tslint:disable react-component-classes-should-implement-scu
import * as React from 'react'
import { SceneNodeBuilderProvider, SceneBuilderConsumer } from './Context'

export class ChartNode extends React.Component<{}, {}> {
	public render() {
		return (
			<SceneBuilderConsumer>
				{sceneBuilder => (
					<SceneNodeBuilderProvider value={sceneBuilder.push()}>
						{this.props.children}
					</SceneNodeBuilderProvider>
				)}
			</SceneBuilderConsumer>
		)
	}
}
