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
	ScatterPlot,
	StackedAreaChart,
	StackedBarChart,
} from '@chart-parts/examples'
import { withSvgRenderer, withStrictMode } from '../util/decorators'

storiesOf('Renderless React Examples', module)
	.addDecorator(withStrictMode)
	.addDecorator(withSvgRenderer)
	.add('Area Chart', () => <AreaChart />)
	.add('Bar Chart', () => <BarChart />)
	.add('Bar Chart with Mean', () => <BarChartWithMean />)
	.add('Elbow Plot', () => <ElbowPlot />)
	.add('Grouped Bar Chart', () => <GroupedBarChart />)
	.add('Job Voyager', () => <JobVoyager />)
	.add('Line Chart', () => <LineChart />)
	.add('Population Pyramid', () => <PopulationPyramid />)
	.add('Scatter Plot', () => <ScatterPlot />)
	.add('Stacked Area Chart ', () => <StackedAreaChart />)
	.add('Stacked Bar Chart', () => <StackedBarChart />)
