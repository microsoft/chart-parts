/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {FlatList, View} from 'react-native';
import {Orchestrator} from '@chart-parts/orchestrator';
import {Renderer} from '@chart-parts/react-native-svg-renderer';
import {testCharts} from '@chart-parts/testdata';

const pipeline = new Orchestrator(new Renderer());
const renderChart = (chart) =>
	pipeline.renderScenegraph(chart.scenegraph, chart.dimensions);

export default function Chart() {
	return (
		<FlatList
			style={{flex: 1}}
			data={testCharts}
			keyExtractor={(item) => item.title}
			renderItem={({item}) => (
				<View style={{height: 500, width: 500}}>{renderChart(item)}</View>
			)}
		/>
	);
}
