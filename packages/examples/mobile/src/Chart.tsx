// tslint:disable jsx-no-object-literal-props jsx-no-lambda jsx-no-lambda-props
import * as React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-native-svg-renderer'
import { View, FlatList, Text } from 'react-native'
import { testCharts } from '@gog/testdata'

const pipeline = new VirtualSvgPipeline(new Renderer())
const renderChart = chart => pipeline.handle(chart.scenegraph, chart.dimensions)
const rendered = testCharts.map(c => renderChart(c))

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
