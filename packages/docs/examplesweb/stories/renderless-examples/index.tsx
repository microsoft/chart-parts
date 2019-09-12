/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	BarChart,
	GroupedBarChart,
	LineChart,
	StackedBarChart,
} from '@chart-parts/examples'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { ChartingProvider } from '@chart-parts/react'

const renderer = new Renderer()

storiesOf('Renderless React Examples', module)
	.add('Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<BarChart />
		</ChartingProvider>
	))
	.add('Stacked Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<StackedBarChart />
		</ChartingProvider>
	))
	.add('Grouped Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<GroupedBarChart />
		</ChartingProvider>
	))
	.add('Line Chart', () => (
		<ChartingProvider value={renderer}>
			<LineChart />
		</ChartingProvider>
	))
