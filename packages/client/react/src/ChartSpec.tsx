import * as React from 'react'
import { scene, SceneNodeBuilder } from '@markable/builder'
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
		this.sceneBuilder = scene(
			node => (sceneNodeBuilder = node),
			this.dimensions,
			this.origin,
		)
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

	private get origin(): [number, number] {
		if (!this.props.padding) {
			return [0, 0]
		}
		const pad = this.props.padding
		const isNumberPad = typeof pad === 'number'
		return isNumberPad
			? [pad as number, pad as number]
			: [(pad as ChartPadding).left || 0, (pad as ChartPadding).top || 0]
	}

	private get dimensions() {
		const { width, height } = this.props
		return { width, height }
	}

	private updateSpec() {
		if (this.sceneBuilder) {
			const spec = this.sceneBuilder.build()
			this.props.onSpecReady(spec)
		}
	}
}
