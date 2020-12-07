/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const BASE_ITEM = {
	stroke: palette.CRIMSON,
	strokeOpacity: 1,
	strokeWidth: 1,
}

const INITIAL_SG = {
	marktype: 'line',
	items: [
		{
			x: 0,
			y: 98.18,
			y2: 200,
			...BASE_ITEM,
		},
		{
			x: 80,
			y: 0,
			y2: 200,
			...BASE_ITEM,
		},
		{
			x: 160,
			y: 47.27,
			y2: 200,
			...BASE_ITEM,
		},
		{
			x: 240,
			y: 76.36,
			y2: 200,
			...BASE_ITEM,
		},
		{
			x: 400,
			y: 25.4545,
			y2: 200,
			...BASE_ITEM,
		},
	],
}

const SLIDERS = [
	{ name: 'tension', min: 0, max: 1, step: 0.05 },
	{ name: 'strokeWidth', max: 10 },
	{ name: 'strokeOpacity', max: 1, min: 0, step: 0.05 },
]

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

const ORIGIN: [number, number] = [10, 0]

const LineTester: React.FC = () => (
	<SingleMarkTester
		chartWidth={420}
		chartOrigin={ORIGIN}
		initialScenegraph={INITIAL_SG}
		sliders={SLIDERS}
		dropdowns={DROPDOWNS}
	/>
)

export default LineTester
