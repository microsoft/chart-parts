/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, memo } from 'react'
import { AreaChartProps } from './types'
import { PlainAreaChart } from './variants/PlainAreaChart'
import { StackedAreaChart } from './variants/StackedAreaChart'

export const AreaChart: FC<AreaChartProps> = memo(function AreaChart(props) {
	if (props.groupBy) {
		return <StackedAreaChart {...props} />
	} else {
		return <PlainAreaChart {...props} />
	}
})
