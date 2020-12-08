/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

/**
 * Re-export the examples as named exports. By leaving them as defaults in their folders, we can template out
 * how the codesandbox packages will look in a standard way, but clients of this library will need the
 * named exports directly.
 */
export { default as AreaChart } from './AreaChart'
export { default as BarChart } from './BarChart'
export { default as BarChartWithMean } from './BarChartWithMean'
export { default as ElbowPlot } from './ElbowPlot'
export { default as GroupedBarChart } from './GroupedBarChart'
export { default as JobVoyager } from './JobVoyager'
export { default as LineChart } from './LineChart'
export { default as PopulationPyramid } from './PopulationPyramid'
export { default as ScatterPlot } from './ScatterPlot'
export { default as StackedAreaChart } from './StackedAreaChart'
export { default as StackedBarChart } from './StackedBarChart'
