/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { action } from '@storybook/addon-actions'
import { number, object, text, boolean, radios } from '@storybook/addon-knobs'
import { useCallback } from 'react'
import { BarChart, BarTips, Orientation } from '../../src'
import {
	makeAxisProps,
	makeChartPadding,
	makeBandScaleProps,
	useHoverIndex,
} from './commonKnobs'

const exampleData = [
	{ key: 'A', value: 28 },
	{ key: 'B', value: 55 },
	{ key: 'C', value: 43 },
	{ key: 'D', value: 91 },
	{ key: 'E', value: 81 },
	{ key: 'F', value: 53 },
	{ key: 'G', value: 19 },
	{ key: 'H', value: 87 },
]

export const InteractiveBarChartTester: React.FC =
	function InteractiveBarChartTester() {
		const [hoverRowIndex, onMouseEnter, onMouseLeave] = useHoverIndex()
		const fill = useCallback(
			ctx => (hoverRowIndex === ctx.index ? 'firebrick' : 'steelblue'),
			[hoverRowIndex],
		)
		const width = number('width', 400)
		const height = number('height', 300)
		const xAxisProps = makeAxisProps('XaxisProps')
		const yAxisProps = makeAxisProps('YaxisProps')
		const data = object('data', exampleData)
		const title = text('title', '')
		const description = text('description', '')
		const chartPadding = makeChartPadding()
		const BandScaleProps = makeBandScaleProps()
		const showTip = boolean('show hover text', true)
		const label = 'Chart Orientation'
		const options = {
			vertical: Orientation.vertical,
			horizontal: Orientation.horizontal,
		}
		const defaultValue = Orientation.vertical
		const groupId = 'Selection-orientation'

		const chartOrient = radios(label, options, defaultValue, groupId)

		return (
			<div>
				<BarChart
					height={height}
					width={width}
					data={data}
					title={title}
					description={description}
					chartPadding={chartPadding}
					bandScaleProps={BandScaleProps}
					orientation={chartOrient}
					yAxisProps={yAxisProps}
					xAxisProps={xAxisProps}
					onMouseEnter={onMouseEnter}
					onMouseLeave={onMouseLeave}
					fill={fill}
					onClick={action('Click')}
				>
					{showTip && <BarTips index={hoverRowIndex} />}
				</BarChart>
			</div>
		)
	}
