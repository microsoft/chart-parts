/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react';
import {Axis, Chart, Rect, LinearScale, BandScale} from '@chart-parts/react';
import {Renderer} from '@chart-parts/react-native-svg-renderer';

const data = [
	{category: 'A', amount: 28},
	{category: 'B', amount: 55},
	{category: 'C', amount: 43},
	{category: 'D', amount: 91},
	{category: 'E', amount: 81},
	{category: 'F', amount: 53},
	{category: 'G', amount: 19},
	{category: 'H', amount: 87},
];

const renderer = new Renderer();

export default class BarChart extends React.Component {
	state = {hoverRowIndex: undefined};

	render() {
		// Externalized Event Handlers
		const onPress = ({index}) => {
			if (this.state.hoverRowIndex !== index) {
				this.setState({hoverRowIndex: index});
			}
		};
		return (
			<Chart width={400} height={200} data={{data}} renderer={renderer}>
				<LinearScale name="yscale" domain="data.amount" range="height" />
				<BandScale
					name="xscale"
					bandWidth="xband"
					domain="data.category"
					padding={0.05}
					range="width"
				/>

				<Axis orient="bottom" scale="xscale" />
				<Axis orient="left" scale="yscale" />
				<Rect
					eventHandlers={{onPress}}
					x={({d, xscale}) => xscale(d.category)}
					y={({d, yscale}) => yscale(d.amount)}
					width={({xband}) => xband()}
					y2={200}
					fill={({index}) => {
						return this.state.hoverRowIndex === index
							? 'firebrick'
							: 'steelblue';
					}}
				/>
			</Chart>
		);
	}
}
