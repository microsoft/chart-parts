/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Interpolation, MarkEncoding } from '@chart-parts/interfaces'
import { Area } from '@chart-parts/react'
import { FC, memo } from 'react'
import {
	encodeCategoryAriaTitle,
	encodeCategoryAriaDescription,
} from '../../hooks'
import { FillMarkProps } from '../../types'

const DEFAULT_STROKE = 'black'
const DEFAULT_FILL = 'steelblue'
const DEFAULT_FILL_OPACITY = 1
const DEFAULT_STROKE_WIDTH = 2

const encodeX: MarkEncoding<number> = ({ d, x }) => x(d.key)
const encodeY: MarkEncoding<number> = ({ d, y }) => y(d.value)
const encodeY2: MarkEncoding<number> = ({ y }) => y(0)

export const AreaMarks: FC<FillMarkProps> = memo(function AreaMarks({
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
			table="data"
			tabIndex={-1}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			fill={fill}
			stroke={stroke}
			fillOpacity={fillOpacity}
			strokeWidth={strokeWidth}
			interpolate={Interpolation.Monotone}
			ariaTitle={encodeCategoryAriaTitle}
			ariaDescription={encodeCategoryAriaDescription}
			x={encodeX}
			y={encodeY}
			y2={encodeY2}
		/>
	)
})
