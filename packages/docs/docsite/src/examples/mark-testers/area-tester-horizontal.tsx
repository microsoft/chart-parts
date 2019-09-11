/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React from 'react'
import { Orientation } from '@chart-parts/interfaces'
import { SingleMarkTester } from './util/single-mark-tester'
import * as palette from './util/palette'

const BASE_ITEM = {
	stroke: palette.CRIMSON,
	fill: palette.GREY,
	fillOpacity: 1,
	strokeOpacity: 1,
	strokeWidth: 2,
	tension: 0,
	orient: Orientation.Horizontal,

	// Base x2 value
	x2: 0,
}

const chartHeight = 250
const interval = chartHeight / 4

const AreaTesterHorizontal: React.FC = () => (
	<SingleMarkTester
		chartWidth={420}
		chartHeight={chartHeight}
		chartOrigin={[10, 0]}
		initialScenegraph={{
			marktype: 'area',
			items: [
				{
					y: interval * 0,
					x: 98.18,
					...BASE_ITEM,
				},
				{
					y: interval,
					x: 20,
					...BASE_ITEM,
				},
				{
					y: interval * 2,
					x: 47.27,
					...BASE_ITEM,
				},
				{
					y: interval * 3,
					x: 76.36,
					...BASE_ITEM,
				},
				{
					y: interval * 4,
					x: 25.4545,
					...BASE_ITEM,
				},
			],
		}}
		sliders={[
			{ name: 'x2', min: 0, max: 400 },
			{ name: 'tension', min: 0, max: 1, step: 0.1 },
			{ name: 'strokeWidth', max: 10 },
			{ name: 'strokeOpacity', max: 1, min: 0, step: 0.1 },
			{ name: 'fillOpacity', max: 1, min: 0, step: 0.1 },
		]}
		dropdowns={[
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
		]}
		toggles={[{ name: 'defined' }]}
		updateScenegraph={(update, scenegraph) => {
			scenegraph.items.forEach((item: any) => {
				Object.keys(update).forEach(key => (item[key] = update[key]))
			})
			return scenegraph
		}}
	/>
)

export default AreaTesterHorizontal
