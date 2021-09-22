/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { number, object, text, radios } from '@storybook/addon-knobs'
import { BarChart, Orientation } from '../../src'
import {
	makeAxisProps,
	makeChartPadding,
	makeBandScaleProps,
} from './commonKnobs'
import { FC } from 'react'

const exData = [
	{ category: 'A', key: '1', value: 0.6 },
	{ category: 'A', key: '2', value: 0.9 },
	{ category: 'A', key: '3', value: 0.4 },
	{ category: 'B', key: '4', value: 0.7 },
	{ category: 'B', key: '5', value: 0.2 },
	{ category: 'B', key: '6', value: 1.1 },
	{ category: 'B', key: '7', value: 0.8 },
	{ category: 'C', key: '8', value: 0.6 },
	{ category: 'C', key: '9', value: 0.1 },
	{ category: 'C', key: '10', value: 0.2 },
	{ category: 'C', key: '11', value: 0.7 },
]

export const StackedBarChartTester: FC = function StackedBarChartTester() {
	const width = number('width', 400)
	const height = number('height', 300)
	const xAxisProps = makeAxisProps('XaxisProps')
	const yAxisProps = makeAxisProps('YaxisProps')
	const data = object('data', exData)
	const title = text('title', '')
	const description = text('description', '')
	const chartPadding = makeChartPadding()
	const bandScaleProps = makeBandScaleProps()
	const label = 'Chart Orientation'
	const options = {
		vertical: Orientation.vertical,
		horizontal: Orientation.horizontal,
	}
	const defaultValue = Orientation.vertical
	const groupId = 'Selection-orientation'
	const chartOrient = radios(label, options, defaultValue, groupId)
	const barPadding = number('barPadding', 10)

	return (
		<div>
			<BarChart
				height={height}
				width={width}
				data={data}
				title={title}
				description={description}
				chartPadding={chartPadding}
				orientation={chartOrient}
				bandScaleProps={bandScaleProps}
				yAxisProps={yAxisProps}
				xAxisProps={xAxisProps}
				groupBy={'category'}
				barPadding={barPadding}
				stacked
			/>
		</div>
	)
}
