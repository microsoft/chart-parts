/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MarkEncoding } from '@chart-parts/interfaces'
import { Circle } from '@chart-parts/react'
import { memo } from 'react'
import {
	encodeCategoryAriaTitle,
	encodeCategoryAriaDescription,
} from '../hooks'
import { FillMarkProps } from '../types'

const DEFAULT_STROKE = 'black'
const DEFAULT_FILL: MarkEncoding<string> = ctx => ctx.color(ctx.d._category)
const DEFAULT_FILL_OPACITY = 1
const DEFAULT_STROKE_WIDTH = 2
const DEFAULT_RADIUS = 50

const encodeX: MarkEncoding<number> = ({ d, x }) => x(d.key)
const encodeY: MarkEncoding<number> = ({ d, y }) => y(d.value)

export interface CircleMarksProps extends FillMarkProps {
	radius?: MarkEncoding<number>
}

export const CircleMarks: React.FC<CircleMarksProps> = memo(
	function CircleMarks({
		onMouseEnter,
		onMouseLeave,
		onClick,
		fill = DEFAULT_FILL,
		fillOpacity = DEFAULT_FILL_OPACITY,
		stroke = DEFAULT_STROKE,
		strokeWidth = DEFAULT_STROKE_WIDTH,
		radius = DEFAULT_RADIUS,
	}) {
		return (
			<Circle
				table="data"
				tabIndex={-1}
				zIndex={0}
				size={radius}
				fill={fill}
				stroke={stroke}
				fillOpacity={fillOpacity}
				strokeWidth={strokeWidth}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				ariaTitle={encodeCategoryAriaTitle}
				ariaDescription={encodeCategoryAriaDescription}
				x={encodeX}
				y={encodeY}
			/>
		)
	},
)
