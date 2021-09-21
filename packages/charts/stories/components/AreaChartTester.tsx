/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { action } from '@storybook/addon-actions'
import { number, object, text } from '@storybook/addon-knobs'
import { AreaChart } from '../../src'
import { makeAxisProps, makeChartPadding } from './commonKnobs'
import { FC } from 'react'

const exData = [
	{ key: 1, value: 28 },
	{ key: 2, value: 55 },
	{ key: 3, value: 43 },
	{ key: 4, value: 91 },
	{ key: 5, value: 81 },
	{ key: 6, value: 53 },
	{ key: 7, value: 19 },
	{ key: 8, value: 87 },
	{ key: 9, value: 52 },
	{ key: 10, value: 48 },
	{ key: 11, value: 24 },
	{ key: 12, value: 49 },
	{ key: 13, value: 87 },
	{ key: 14, value: 66 },
	{ key: 15, value: 17 },
	{ key: 16, value: 27 },
	{ key: 17, value: 68 },
	{ key: 18, value: 16 },
	{ key: 19, value: 49 },
	{ key: 20, value: 15 },
]

export const AreaChartTester: FC = function AreaChartTester() {
	const width = number('width', 400)
	const height = number('height', 300)
	const xAxisProps = makeAxisProps('XaxisProps')
	const yAxisProps = makeAxisProps('YaxisProps')
	const data = object('data', exData)
	const title = text('title', '')
	const description = text('description', '')
	const chartPadding = makeChartPadding()

	return (
		<div>
			<AreaChart
				height={height}
				width={width}
				data={data}
				title={title}
				description={description}
				chartPadding={chartPadding}
				yAxisProps={yAxisProps}
				xAxisProps={xAxisProps}
				onMouseEnter={action('onMouseEnter')}
				onMouseLeave={action('onMouseLeave')}
				onClick={action('onClick')}
				strokeWidth={3}
			/>
		</div>
	)
}
