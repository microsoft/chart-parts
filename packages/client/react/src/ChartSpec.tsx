import * as React from 'react'
import { SceneBuilder } from '@gog/scenegen'
import { SceneBuilderProvider, SceneNodeBuilderProvider } from './Context'

export interface ChartPadding {
	top?: number
	bottom?: number
	left?: number
	right?: number
}

export interface ChartSpecProps {
	width: number
	height: number
	padding?: number | ChartPadding
	onSpecReady: (spec: any) => void
}

export class ChartSpec extends React.PureComponent<ChartSpecProps> {
	private sceneBuilder: SceneBuilder | undefined
	public render() {
		this.sceneBuilder = new SceneBuilder()
		return (
			<SceneBuilderProvider value={this.sceneBuilder}>
				<SceneNodeBuilderProvider value={this.sceneBuilder}>
					{this.props.children}
				</SceneNodeBuilderProvider>
			</SceneBuilderProvider>
		)
	}

	public componentDidMount() {
		this.updateSpec()
	}

	public componentDidUpdate() {
		return this.updateSpec()
	}

	private updateSpec() {
		if (this.sceneBuilder) {
			const spec = this.sceneBuilder.build()
			this.props.onSpecReady(spec)
		}
	}
}
