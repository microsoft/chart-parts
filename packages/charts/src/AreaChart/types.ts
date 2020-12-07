/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { CommonChartProps, FillMarkProps, AxisProps } from '../types'

export interface AreaChartProps extends CommonChartProps, FillMarkProps {
	groupBy?: string
	xAxisProps?: AxisProps
	yAxisProps?: AxisProps
}
