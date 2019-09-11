/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { useContext, memo, useEffect } from 'react'
import { AxisOrientation, TickValue } from '@chart-parts/interfaces'
import { axis } from '@chart-parts/builder'
import { SceneNodeBuilderContext } from './Context'

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

	/**
	 * The thickness of the axis in pixels.
	 * NOTE: Unfortunately we can't mesaure text dynamically in all situations.
	 */
	thickness?: number

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
	tickSize?: number
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

export const Axis: React.FC<AxisProps> = memo(
	({ children, scale, orient, ...props }) => {
		const api = useContext(SceneNodeBuilderContext)
		useEffect(() => {
			if (api) {
				const newAxis = axis(scale, orient)
				Object.keys(props).forEach(propName => {
					const propValue = (props as any)[propName]
					if (propValue !== undefined) {
						;(newAxis as any)[propName](propValue)
					}
				})
				api.axes(newAxis)
			}
		}, [scale, orient, props, api])
		return <>{children}</>
	},
)

Axis.displayName = 'Axis'
