/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'
import { Orientation } from '@chart-parts/interfaces'

const BASE_ITEM = {
	stroke: palette.CRIMSON,
	fill: palette.GREY,
	fillOpacity: 1,
	strokeOpacity: 1,
	strokeWidth: 2,
	tension: 0,
	orient: Orientation.Vertical,

	// Y baseline
	y2: 200,
}
const chartHeight = 250
const chartWidth = 420
const interval = chartWidth / 5

const ORIGIN: [number, number] = [10, 0]
const DROPDOWNS = [
	{
		name: 'interpolate',
		options: [
			'basis',
			'cardinal',
			'catmull-rom',
			'linear',
			'monotone',
			'natural',
			'step',
			'step-after',
			'step-before',
		],
	},
]

const INITIAL_SG = {
	marktype: 'area',
	items: [
		{
			x: interval * 0,
			y: 98.18,
			...BASE_ITEM,
		},
		{
			x: interval,
			y: 0,
			...BASE_ITEM,
		},
		{
			x: interval * 2,
			y: 47.27,
			...BASE_ITEM,
		},
		{
			x: interval * 3,
			y: 76.36,
			...BASE_ITEM,
		},
		{
			x: interval * 4,
			y: 25.4545,
			...BASE_ITEM,
		},
	],
}
const SLIDERS = [
	{ name: 'y2', min: 0, max: 200 },
	{ name: 'tension', min: 0, max: 1, step: 0.05 },
	{ name: 'strokeWidth', max: 10 },
	{ name: 'strokeOpacity', min: 0, max: 1, step: 0.05 },
	{ name: 'fillOpacity', min: 0, max: 1, step: 0.05 },
]

const TOGGLES = [{ name: 'defined' }]

const AreaTesterVertical: React.FC = () => (
	<SingleMarkTester
		chartWidth={chartWidth}
		chartHeight={chartHeight}
		chartOrigin={ORIGIN}
		initialScenegraph={INITIAL_SG}
		sliders={SLIDERS}
		dropdowns={DROPDOWNS}
		toggles={TOGGLES}
	/>
)
export default AreaTesterVertical
