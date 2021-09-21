/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ChartPadding, Chart } from '@chart-parts/react'
import { FC, memo } from 'react'

export interface ChartContainerProps {
	height: number
	width: number
	title?: string
	description?: string
	data: Record<string, any[]>
	padding?: ChartPadding | number
}

const DEFAULT_PADDING = 10

export function createChartContainer(
	defaultTitle: string,
): FC<ChartContainerProps> {
	const Container: FC<ChartContainerProps> = memo(function Container({
		height,
		width,
		title = defaultTitle,
		description = defaultTitle,
		padding = DEFAULT_PADDING,
		data,
		children,
	}) {
		return (
			<Chart
				width={width}
				height={height}
				title={title}
				description={description}
				padding={padding}
				data={data}
			>
				{children}
			</Chart>
		)
	})
	return Container
}
