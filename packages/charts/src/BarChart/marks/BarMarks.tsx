/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MarkEncoding } from '@chart-parts/interfaces'
import { Rect } from '@chart-parts/react'
import React, { memo } from 'react'
import {
	encodeCategoryAriaTitle,
	encodeCategoryAriaDescription,
} from '../../hooks'
import { FillMarkProps } from '../../types'

const DEFAULT_FILL = 'steelblue'
const DEFAULT_FILL_OPACITY = 1
const DEFAULT_STROKE = 'black'
const DEFAULT_STROKE_WIDTH = 2

const encodeX: MarkEncoding<number> = ({ d, x }) => x(d._key)
const encodeY: MarkEncoding<number> = ({ d, y }) => y(d._value)
const encodeY2: MarkEncoding<number> = ({ y }) => y(0)
const encodeX2: MarkEncoding<number> = ({ x }) => x(0)
const encodeHeight: MarkEncoding<number> = ({ band }) => band()
const encodeWidth: MarkEncoding<number> = ({ band }) => band()

export const BarMarks: React.FC<FillMarkProps> = memo(function BarMarks({
	onMouseEnter,
	onMouseLeave,
	onClick,
	fill = DEFAULT_FILL,
	fillOpacity = DEFAULT_FILL_OPACITY,
	stroke = DEFAULT_STROKE,
	strokeWidth = DEFAULT_STROKE_WIDTH,
}) {
	return (
		<Rect
			table="data"
			tabIndex={-1}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			fill={fill}
			stroke={stroke}
			fillOpacity={fillOpacity}
			strokeWidth={strokeWidth}
			x={encodeX}
			y={encodeY}
			y2={encodeY2}
			x2={encodeX2}
			height={encodeHeight}
			width={encodeWidth}
			ariaTitle={encodeCategoryAriaTitle}
			ariaDescription={encodeCategoryAriaDescription}
		/>
	)
})
