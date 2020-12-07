/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import * as AnnualTemperature from './annual_temperature'
import * as ArcDiagram from './arc_diagram'
import * as AreaChart from './area_chart'
import * as BarChart from './bar_chart'
import * as BarleyTrellis from './barley_trellis'
import * as BeeswarmPlot from './beeswarm_plot'
import * as BinnedScatterPlot from './binned_scatter_plot'
import * as BoxPlot from './box_plot'
import * as BudgetForecasts from './budget_forecasts'
import * as CirclePacking from './circle_packing'
import * as ConnectedScatterPlot from './connected_scatter_plot'
import * as ContourPlot from './contour_plot'
import * as DonutChart from './donut_chart'
import * as DorlingCartogram from './dorling_cartogram'
import * as EdgeBundling from './edge_bundling'
import * as ErrorBars from './error_bars'
import * as FalkenseePopulation from './falkensee_population'
import * as ForceDirectedLayout from './force_directed_layout'
import * as GroupedBarChart from './grouped_bar_chart'
import * as Heatmap from './heatmap'
import * as Histogram from './histogram'
import * as HistogramNullValues from './histogram_null_values'
import * as HorizonGraph from './horizon_graph'
import * as JobVoyager from './job_voyager'
import * as LineChart from './line_chart'
import * as NestedBarChart from './nested_bar_chart'
import * as ParallelCoordinates from './parallel_coordinates'
import * as PieChart from './pie_chart'
import * as PopulationPyramid from './population_pyramid'
import * as ProbabilityDensity from './probability_density'
import * as RadialPlot from './radial_plot'
import * as RadialTree from './radial_tree'
import * as ReorderableMatrix from './reorderable_matrix'
import * as ScatterPlot from './scatter_plot'
import * as ScatterPlotNullValues from './scatter_plot_null_values'
import * as StackedAreaChart from './stacked_area_chart'
import * as StackedBarChart from './stacked_bar_chart'
import * as Sunburst from './sunburst'
import * as Timeline from './timeline'
import * as TopKPlot from './top_k_plot'
import * as TopKPlotWithOthers from './top_k_plot_with_others'
import * as TreeLayout from './tree_layout'
import * as Treemap from './treemap'
import * as UDistrictCuisine from './u_district_cuisine'
import * as ViolinPlot from './violin_plot'
import * as WeeklyTemperature from './weekly_temperature'
import * as WheatAndWages from './wheat_and_wages'
import * as WheatPlot from './wheat_plot'
import * as WordCloud from './word_cloud'
import { SGMark } from '@chart-parts/interfaces'
/*
	Need shape mark support to draw cartographic projections
 
import * as CountyUnemployment from './county_unemployment'
import * as WorldMap from './world_map'
import * as Earthquakes from './earthquakes'
import * as Projections from './projections'
import * as ZoomableWorldMap from './zoomable_world_map'
import * as DistortionComparisonMap from './distortion_comparison_map'
import * as AirportConnections from './airport_connections'
*/

export interface TestScenegraph {
	title: string
	scenegraph: SGMark<any>
	dimensions: {
		height: number
		width: number
		origin: [number, number]
	}
}
export const testCharts: TestScenegraph[] = [
	BarChart,
	StackedBarChart,
	GroupedBarChart,
	NestedBarChart,
	PopulationPyramid,
	LineChart,
	AreaChart,
	StackedAreaChart,
	HorizonGraph,
	JobVoyager,
	PieChart,
	DonutChart,
	RadialPlot,
	ScatterPlot,
	ScatterPlotNullValues,
	ConnectedScatterPlot,
	ErrorBars,
	BarleyTrellis,
	Histogram,
	HistogramNullValues,
	ProbabilityDensity,
	BoxPlot,
	ViolinPlot,
	TopKPlot,
	TopKPlotWithOthers,
	BinnedScatterPlot,
	ContourPlot,
	WheatPlot,
	// CountyUnemployment,
	DorlingCartogram,
	// WorldMap,
	// Earthquakes,
	// Projections,
	// ZoomableWorldMap,
	// DistortionComparisonMap,
	TreeLayout,
	RadialTree,
	Treemap,
	CirclePacking,
	Sunburst,
	EdgeBundling,
	ForceDirectedLayout,
	ReorderableMatrix,
	ArcDiagram,
	// AirportConnections,
	Heatmap,
	ParallelCoordinates,
	WordCloud,
	Timeline,
	BeeswarmPlot,
	BudgetForecasts,
	WheatAndWages,
	FalkenseePopulation,
	AnnualTemperature,
	WeeklyTemperature,
	UDistrictCuisine,
]
