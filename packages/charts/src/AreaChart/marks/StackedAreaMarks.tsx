/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Interpolation, MarkEncoding } from '@chart-parts/interfaces'
import { Area } from '@chart-parts/react'
import { memo } from 'react'
import {
	encodeCategoryAriaTitle,
	encodeCategoryAriaDescription,
} from '../../hooks'
import { FillMarkProps } from '../../types'

const DEFAULT_FILL: MarkEncoding<string> = ctx => ctx.color(ctx.d._category)
const DEFAULT_FILL_OPACITY = 1
const DEFAULT_STROKE = 'black'
const DEFAULT_STROKE_WIDTH = 2

const encodeX: MarkEncoding<number> = ({ d, x }) => x(d.key)
const encodeY: MarkEncoding<number> = ({ d, y }) => y(d.y0)
const encodeY2: MarkEncoding<number> = ({ d, y }) => y(d.y1)

export const StackedAreaMarks: React.FC<FillMarkProps> = memo(
	function StackedAreaMarks({
		onClick,
		onMouseEnter,
		onMouseLeave,
		fill = DEFAULT_FILL,
		fillOpacity = DEFAULT_FILL_OPACITY,
		stroke = DEFAULT_STROKE,
		strokeWidth = DEFAULT_STROKE_WIDTH,
	}) {
		return (
			<Area
				table="faceted"
				tabIndex={-1}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				fill={fill}
				fillOpacity={fillOpacity}
				interpolate={Interpolation.Monotone}
				stroke={stroke}
				strokeWidth={strokeWidth}
				ariaTitle={encodeCategoryAriaTitle}
				ariaDescription={encodeCategoryAriaDescription}
				x={encodeX}
				y={encodeY}
				y2={encodeY2}
			/>
		)
	},
)
