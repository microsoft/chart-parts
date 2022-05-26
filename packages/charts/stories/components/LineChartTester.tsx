/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MarkEncoding } from '@chart-parts/interfaces'
import { action } from '@storybook/addon-actions'
import { number, object, text, boolean } from '@storybook/addon-knobs'
import { FC } from 'react'
import { LineChart } from '../../src'
import { makeAxisProps, makeChartPadding } from './commonKnobs'

const exData = [
	{ key: 0, value: 28, c: 0 },
	{ key: 0, value: 20, c: 1 },
	{ key: 1, value: 43, c: 0 },
	{ key: 1, value: 35, c: 1 },
	{ key: 2, value: 81, c: 0 },
	{ key: 2, value: 10, c: 1 },
	{ key: 3, value: 19, c: 0 },
	{ key: 3, value: 15, c: 1 },
	{ key: 4, value: 52, c: 0 },
	{ key: 4, value: 48, c: 1 },
	{ key: 5, value: 24, c: 0 },
	{ key: 5, value: 28, c: 1 },
	{ key: 6, value: 87, c: 0 },
	{ key: 6, value: 66, c: 1 },
	{ key: 7, value: 17, c: 0 },
	{ key: 7, value: 27, c: 1 },
	{ key: 8, value: 68, c: 0 },
	{ key: 8, value: 16, c: 1 },
	{ key: 9, value: 49, c: 0 },
	{ key: 9, value: 25, c: 1 },
]

export const LineChartTester: FC = function LineChartTester() {
	const width = number('width', 400)
	const height = number('height', 300)
	const xAxisProps = makeAxisProps('XAxisProps')
	const yAxisProps = makeAxisProps('YAxisProps')

	const data = object('data', exData)
	const title = text('title', '')
	const description = text('description', '')
	const chartPadding = makeChartPadding()
	const setStroke: MarkEncoding<string> = ctx => {
		const colors = ['#80acf7', '#cc94f7']
		return colors[ctx.d._category]
	}
	const useSetStroke = boolean('use custom stroke method', false)

	return (
		<div>
			<LineChart
				height={height}
				width={width}
				data={data}
				title={title}
				description={description}
				chartPadding={chartPadding}
				yAxisProps={yAxisProps}
				xAxisProps={xAxisProps}
				groupBy={'c'}
				stroke={useSetStroke ? setStroke : undefined}
				onMouseEnter={action('onMouseEnter')}
				onMouseLeave={action('onMouseLeave')}
				onClick={action('onClick')}
				strokeWidth={3}
			/>
		</div>
	)
}
