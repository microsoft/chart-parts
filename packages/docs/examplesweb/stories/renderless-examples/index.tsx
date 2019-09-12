/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import { storiesOf } from '@storybook/react'
import {
	AreaChart,
	BarChart,
	BarChartWithMean,
	ElbowPlot,
	GroupedBarChart,
	JobVoyager,
	LineChart,
	PopulationPyramid,
	StackedAreaChart,
	StackedBarChart,
} from '@chart-parts/examples'
import { Renderer } from '@chart-parts/react-svg-renderer'
import { ChartingProvider } from '@chart-parts/react'

const renderer = new Renderer()

storiesOf('Renderless React Examples', module)
	.add('Area Chart', () => (
		<ChartingProvider value={renderer}>
			<AreaChart />
		</ChartingProvider>
	))
	.add('Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<BarChart />
		</ChartingProvider>
	))
	.add('Bar Chart with Mean', () => (
		<ChartingProvider value={renderer}>
			<BarChartWithMean />
		</ChartingProvider>
	))
	.add('Elbow Plot', () => (
		<ChartingProvider value={renderer}>
			<ElbowPlot />
		</ChartingProvider>
	))
	.add('Grouped Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<GroupedBarChart />
		</ChartingProvider>
	))
	.add('Job Voyager', () => (
		<ChartingProvider value={renderer}>
			<JobVoyager />
		</ChartingProvider>
	))
	.add('Line Chart', () => (
		<ChartingProvider value={renderer}>
			<LineChart />
		</ChartingProvider>
	))
	.add('Population Pyramid', () => (
		<ChartingProvider value={renderer}>
			<PopulationPyramid />
		</ChartingProvider>
	))
	.add('Stacked Area Chart ', () => (
		<ChartingProvider value={renderer}>
			<StackedAreaChart />
		</ChartingProvider>
	))
	.add('Stacked Bar Chart', () => (
		<ChartingProvider value={renderer}>
			<StackedBarChart />
		</ChartingProvider>
	))
