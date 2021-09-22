/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MarkEncoding } from '@chart-parts/interfaces'
import { Rect } from '@chart-parts/react'
import { memo } from 'react'
import {
	encodeCategoryAriaTitle,
	encodeCategoryAriaDescription,
} from '../../hooks'
import { FillMarkProps } from '../../types'

// Prop defaults
const DEFAULT_FILL: MarkEncoding<string> = ctx => ctx.color(ctx.d._position)
const DEFAULT_FILL_OPACITY = 1
const DEFAULT_STROKE = 'black'
const DEFAULT_STROKE_WIDTH = 2

// Static Encodings
const encodeX: MarkEncoding<number> = ({ d, x, localX }) =>
	localX ? localX(d._position) : x(d.value)
const encodeY: MarkEncoding<number> = ({ d, localY, y }) =>
	localY ? localY(d._position) : y(d.value)
const encodeHeight: MarkEncoding<number> = ({ rowHeight, rowWidth }) =>
	rowHeight ? rowHeight() : rowWidth()
const encodeWidth: MarkEncoding<number> = ({ rowHeight, rowWidth }) =>
	rowHeight ? rowHeight() : rowWidth()
const encodeY2: MarkEncoding<number> = ({ y }) => y(0)
const encodeX2: MarkEncoding<number> = ({ x }) => x(0)

export const GroupedBarMarks: React.FC<FillMarkProps> = memo(
	function GroupedBarMarks({
		onClick,
		onMouseEnter,
		onMouseLeave,
		fill = DEFAULT_FILL,
		fillOpacity = DEFAULT_FILL_OPACITY,
		stroke = DEFAULT_STROKE,
		strokeWidth = DEFAULT_STROKE_WIDTH,
	}) {
		return (
			<Rect
				name="bars"
				table="facet"
				tabIndex={-1}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				onClick={onClick}
				fill={fill}
				fillOpacity={fillOpacity}
				stroke={stroke}
				strokeWidth={strokeWidth}
				ariaTitle={encodeCategoryAriaTitle}
				ariaDescription={encodeCategoryAriaDescription}
				x={encodeX}
				y={encodeY}
				y2={encodeY2}
				x2={encodeX2}
				height={encodeHeight}
				width={encodeWidth}
			/>
		)
	},
)
