/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { AxisOrientation } from '@chart-parts/interfaces'
import { Axis, LinearScale, Dimension } from '@chart-parts/react'
import { FC, useMemo, memo } from 'react'
import { createChartContainer } from '../../util'
import { AreaMarks } from '../marks/AreaMarks'
import { AreaChartProps } from '../types'

const Container = createChartContainer('Area Chart')

export const PlainAreaChart: FC<AreaChartProps> = memo(function PlainAreaChart({
	data,
	height,
	width,
	title,
	chartPadding,
	description,
	children,
	xAxisProps,
	yAxisProps,
	...props
}) {
	return (
		<Container
			width={width}
			height={height}
			data={useMemo(() => ({ data }), [data])}
			title={title}
			description={description}
			padding={chartPadding}
		>
			<LinearScale
				name="x"
				domain="data.key"
				range={Dimension.Width}
				zero={false}
			/>
			<LinearScale
				name="y"
				domain="data.value"
				range={Dimension.Height}
				nice
				zero
			/>

			<Axis
				orient={AxisOrientation.Bottom}
				scale="x"
				tickCount={20}
				{...xAxisProps}
			/>
			<Axis orient={AxisOrientation.Left} scale="y" {...yAxisProps} />
			<AreaMarks {...props} />
			{children}
		</Container>
	)
})
