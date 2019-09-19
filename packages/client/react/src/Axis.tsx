/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React, { useContext, memo, useEffect, useMemo } from 'react'
import { AxisOrientation, TickValue, FontWeight } from '@chart-parts/interfaces'
import { axis as newAxis, AxisBuilder } from '@chart-parts/builder'
import { SceneBuilderContext } from './Context'

/**
 * Axis Component Props
 * @category Utility
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
	tickWidth?: number
	bandPosition?: number
	values?: TickValue[]
	// #endregion

	// #region Label Properties
	labels?: boolean
	labelFont?: string
	labelFontSize?: number
	labelColor?: string
	labelPadding?: number
	labelFontWeight?: FontWeight
	labelAngle?: number
	labelFormat?: string
	// #endregion
}

/**
 * The Axis component is used to define axes on a chart. Axes are always
 * bound to a scale using the *scale* prop and are anchored to an edge of the
 * available view space using the *orient* prop.
 * @category Utility
 */
export const Axis: React.FC<AxisProps> = memo(
	({ children, scale, orient, ...props }) => {
		const api = useContext(SceneBuilderContext)
		const axis = useMemo(() => newAxis(scale, orient), [scale, orient])

		useAxisProps(axis, props as AxisProps)

		useEffect(() => {
			if (api) {
				api.axes(axis)
				return () => {
					api.removeAxis(axis)
				}
			}
		}, [axis, api])
		return <>{children}</>
	},
)

/**
 * Synchronize React props with the Axis Builder object.
 * @param axis The Axis builder instance
 * @param props The Axis react props
 */
function useAxisProps(axis: AxisBuilder, props: AxisProps) {
	useEffect(() => {
		axis.thickness(props.thickness)
	}, [props.thickness])
	useEffect(() => {
		axis.domain(props.domain)
	}, [props.domain])
	useEffect(() => {
		axis.domainWidth(props.domainWidth)
	}, [props.domainWidth])
	useEffect(() => {
		axis.domainColor(props.domainColor)
	}, [props.domainColor])
	useEffect(() => {
		axis.ticks(props.ticks)
	}, [props.ticks])
	useEffect(() => {
		axis.tickColor(props.tickColor)
	}, [props.tickColor])
	useEffect(() => {
		axis.tickCount(props.tickCount)
	}, [props.tickCount])
	useEffect(() => {
		axis.tickOffset(props.tickOffset)
	}, [props.tickOffset])
	useEffect(() => {
		axis.tickRound(props.tickRound)
	}, [props.tickRound])
	useEffect(() => {
		axis.tickSize(props.tickSize)
	}, [props.tickSize])
	useEffect(() => {
		axis.tickWidth(props.tickWidth)
	}, [props.tickWidth])
	useEffect(() => {
		axis.bandPosition(props.bandPosition)
	}, [props.bandPosition])
	useEffect(() => {
		axis.values(props.values)
	}, [props.values])
	useEffect(() => {
		axis.labels(props.labels)
	}, [props.labels])
	useEffect(() => {
		axis.labelFont(props.labelFont)
	}, [props.labelFont])
	useEffect(() => {
		axis.labelFontSize(props.labelFontSize)
	}, [props.labelFontSize])
	useEffect(() => {
		axis.labelColor(props.labelColor)
	}, [props.labelColor])
	useEffect(() => {
		axis.labelPadding(props.labelPadding)
	}, [props.labelPadding])
	useEffect(() => {
		axis.labelFontWeight(props.labelFontWeight)
	}, [props.labelFontWeight])
	useEffect(() => {
		axis.labelAngle(props.labelAngle)
	}, [props.labelAngle])
	useEffect(() => {
		axis.labelFormat(props.labelFormat)
	}, [props.labelFormat])
}

Axis.displayName = 'Axis'
