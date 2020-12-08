/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	CommonChartProps,
	FillMarkProps,
	Orientation,
	BandScaleProps,
	AxisProps,
} from '../types'

export interface BarChartProps extends CommonChartProps, FillMarkProps {
	groupBy?: string
	stacked?: boolean
	orientation?: Orientation
	bandScaleProps?: BandScaleProps
	xAxisProps?: AxisProps
	yAxisProps?: AxisProps
	barPadding?: number
}
