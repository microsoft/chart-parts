/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { FC, memo } from 'react'
import { BarChartProps } from './types'
import { GroupedBarChart } from './variants/GroupedBarChart'
import { PlainBarChart } from './variants/PlainBarChart'
import { StackedBarChart } from './variants/StackedBarChart'

export const BarChart: FC<BarChartProps> = memo(function BarChart(props) {
	if (props.groupBy && props.stacked) {
		return <StackedBarChart {...props} />
	} else if (props.groupBy) {
		return <GroupedBarChart {...props} />
	} else {
		return <PlainBarChart {...props} />
	}
})
