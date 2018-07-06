import * as React from 'react'
import { SceneNodeBuilder, axis } from '@gog/builder'
import { SceneNodeBuilderConsumer } from './Context'
import { TickValue } from '@gog/core'

export type AxisOrientation = 'top' | 'left' | 'bottom' | 'right'

/**
 * Axis Component Props
 */
export interface AxisProps {
	/**
	 * A name reference for a scale
	 */
	scale: string

	/**
	 * The axis' orientation on the chart
	 */
	orient: AxisOrientation

	// #region Domain Properties
	domain?: boolean
	domainWidth?: number
	domainColor?: string
	// #endregion

	// #region Ticks Properties
	ticks?: boolean
	tickColor?: string
	tickCount?: number
	tickOffset?: number
	tickRound?: boolean
	tickSize?: boolean
	tickWidth?: boolean
	bandPosition?: number
	values?: TickValue[]
	// #endregion

	// #region Label Properties
	labels?: boolean
	labelFont?: string
	labelFontSize?: number
	labelColor?: string
	labelPadding?: number
	labelFontWeight?: number
	labelAngle?: number
	labelFormat?: string
	// #endregion
}

export class Axis extends React.PureComponent<AxisProps> {
	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{api => {
					this.receiveApi(api)
					return this.props.children
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	private receiveApi(api: SceneNodeBuilder) {
		const { scale, orient } = this.props
		const newAxis = axis(scale, orient)

		// For any other properties that are set to defined values, pipe them into the axis builder
		Object.keys(this.props).forEach(propName => {
			const propValue = (this.props as any)[propName]
			if (
				propName !== 'scale' &&
				propName !== 'orient' &&
				propValue !== undefined
			) {
				;(newAxis as any)[propName](propValue)
			}
		})
		api.axes(newAxis)
	}
}
