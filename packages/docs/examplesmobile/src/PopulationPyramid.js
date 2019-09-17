/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react';
import {View, Slider, Text as RNText} from 'react-native';
import {dataset, filter, aggregate} from '@chart-parts/transform';
import {
	Axis,
	Group,
	Chart,
	BandScale,
	Text,
	Rect,
	OrdinalScale,
	LinearScale,
} from '@chart-parts/react';
import {
	VerticalTextAlignment,
	HorizontalAlignment,
	AxisOrientation,
} from '@chart-parts/interfaces';
import {Renderer} from '@chart-parts/react-native-svg-renderer';

const population = require('vega-datasets/data/population.json');
const renderer = new Renderer();

const chartWidth = 380;
const chartHeight = 650;
const textLineWidth = 18;
const AXIS_THICKNESS = 25;
const chartPadding = 10;
const chartSegmentWidth = (chartWidth - chartPadding * 2 - textLineWidth) / 2;

export default class PopulationPyramid extends React.Component {
	state = {year: 2000};

	render() {
		const {year} = this.state;
		const ds = dataset()
			.addTable('population', population)
			.addDerivedTable('popYear', 'population', filter(d => d.year === year))
			.addDerivedTable('males', 'popYear', filter(d => d.sex === 1))
			.addDerivedTable('females', 'popYear', filter(d => d.sex === 2))
			.addDerivedTable('ageGroups', 'population', aggregate().groupBy('age'));

		return (
			<View>
				<PyramidChart data={ds.tables} />
				<Slider
					minimumValue={1850}
					maximumValue={2000}
					step={10}
					value={year}
					onValueChange={this.handleYearChange}
				/>
				<RNText>{year}</RNText>
			</View>
		);
	}

	handleYearChange = arg => {
		this.setState({year: arg});
	};
}

const PyramidChart = ({data}) => (
	<Chart
		width={chartWidth}
		height={chartHeight}
		padding={chartPadding}
		renderer={renderer}
		data={data}>
		<ChartScales />
		<AgeLabels />
		<MPerYear />
		<FPerYear />
	</Chart>
);

const ChartScales = () => [
	<BandScale
		name="y"
		key="y"
		bandWidth="yband"
		range={arg => [arg.view.height - AXIS_THICKNESS, 0]}
		domain="ageGroups.age"
		padding={0.1}
		round
	/>,
	<OrdinalScale
		name="c"
		key="c"
		domain={['1', '2']}
		range={['#1f77b4', '#e377c2']}
	/>,
];

const AgeLabels = () => (
	<Text
		table="ageGroups"
		x={chartSegmentWidth + textLineWidth / 2}
		y={({d, y, yband}) => y(d.age) + yband() / 2}
		text={({d}) => d.age}
		baseline={VerticalTextAlignment.Middle}
		align={HorizontalAlignment.Center}
		fill={'black'}
	/>
);

const FPerYear = () => (
	<GenderPerYearSection
		xStart={0}
		table="females"
		xRange={[chartSegmentWidth, 0]}
	/>
);

const MPerYear = () => (
	<GenderPerYearSection
		table="males"
		xStart={chartSegmentWidth + textLineWidth}
		xRange={[0, chartSegmentWidth]}
	/>
);

const GenderPerYearSection = ({table, xRange, xStart}) => (
	<Group x={xStart} height={({view}) => view.height} width={chartSegmentWidth}>
		<LinearScale domain="population.people" range={xRange} name="x" nice zero />
		<Axis
			orient={AxisOrientation.Bottom}
			scale="x"
			labelFormat="~s"
			tickCount={5}
			thickness={AXIS_THICKNESS}
		/>
		<GenderPerYearRect table={table} />
	</Group>
);

const GenderPerYearRect = ({table}) => (
	<Rect
		table={table}
		x={({d, x}) => x(d.people)}
		x2={({x}) => x(0)}
		y={({d, y}) => y(d.age)}
		height={({yband}) => yband()}
		fillOpacity={0.6}
		fill={({d, c}) => c(d.sex)}
	/>
);
