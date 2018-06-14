// tslint:disable jsx-no-object-literal-props jsx-no-lambda jsx-no-lambda-props
import * as React from 'react'
import { FlatList, View } from 'react-native'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-native-svg-renderer'
import { testCharts, TestScenegraph } from '@gog/testdata'

const pipeline = new VirtualSvgPipeline(new Renderer())
const renderChart = (chart: TestScenegraph) =>
	pipeline.handleScenegraph(chart.scenegraph, chart.dimensions)

export default () => (
	<FlatList
		style={{ flex: 1 }}
		data={testCharts}
		keyExtractor={item => item.title}
		renderItem={({ item }) => (
			<View style={{ height: 500, width: 500 }}>{renderChart(item)}</View>
		)}
	/>
)
