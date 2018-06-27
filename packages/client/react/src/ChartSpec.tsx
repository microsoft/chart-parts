import * as React from 'react'
import { scene, SceneNodeBuilder } from '@gog/scenegen'
import { SceneNodeBuilderProvider } from './Context'

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
	private sceneBuilder: SceneNodeBuilder | undefined

	public render() {
		let sceneNodeBuilder: SceneNodeBuilder | undefined
		this.sceneBuilder = scene(node => (sceneNodeBuilder = node))
		return (
			<SceneNodeBuilderProvider value={sceneNodeBuilder as SceneNodeBuilder}>
				{this.props.children}
			</SceneNodeBuilderProvider>
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
