/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	AreaChart,
	BarChart,
	BarChartWithMean,
	GroupedBarChart,
	JobVoyager,
	LineChart,
	PoulationPyramid,
	StackedBarChart,
	StackedAreaChart,
} from '@chart-parts/examples'

export default {
	// Bar Charts
	'bar-chart': BarChart,
	'grouped-bar-chart': GroupedBarChart,
	'stacked-bar-chart': StackedBarChart,
	'bar-chart-with-mean': BarChartWithMean,

	// Line & Area Charts
	'line-chart': LineChart,
	'area-chart': AreaChart,
	'stacked-area-chart': StackedAreaChart,
	'population-pyramid': PoulationPyramid,
	'job-voyager': JobVoyager,
}
