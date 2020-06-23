import { configure } from '@storybook/react'

function loadStories() {
	require('../stories/AreaChartStories')
	require('../stories/BarChartStories')
	require('../stories/LineChartStories')
	require('../stories/ScatterPlotStories')
}

configure(loadStories, module)
