/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MarkEncoding } from '@chart-parts/interfaces'
import { Rect } from '@chart-parts/react'
import { FC, memo, useCallback } from 'react'
import {
	encodeCategoryAriaTitle,
	encodeCategoryAriaDescription,
} from '../../hooks'
import { FillMarkProps } from '../../types'
const DEFAULT_BAR_PADDING = 5

export interface StackedBarMarksProps extends FillMarkProps {
	barPadding?: number
}

const DEFAULT_FILL: MarkEncoding<string> = ctx => ctx.color(ctx.d._category)
const DEFAULT_FILL_OPACITY = 1
const DEFAULT_STROKE = 'black'
const DEFAULT_STROKE_WIDTH = 2

const encodeX: MarkEncoding<number> = ({ d, xVertical, xHorizontal }) =>
	xHorizontal ? xHorizontal(d.y0) : xVertical(d._category)
const encodeY: MarkEncoding<number> = ({ d, yVertical, yHorizontal }) =>
	yHorizontal ? yHorizontal(d._category) : yVertical(d.y0)

export const StackedBarMarks: FC<StackedBarMarksProps> = memo(
	function StackedBarMarks({
		onClick,
		onMouseEnter,
		onMouseLeave,
		fill = DEFAULT_FILL,
		fillOpacity = DEFAULT_FILL_OPACITY,
		stroke = DEFAULT_STROKE,
		strokeWidth = DEFAULT_STROKE_WIDTH,
		barPadding = DEFAULT_BAR_PADDING,
	}) {
		return (
			<Rect
				table="data"
				tabIndex={-1}
				fill={fill}
				fillOpacity={fillOpacity}
				stroke={stroke}
				strokeWidth={strokeWidth}
				onClick={onClick}
				onMouseEnter={onMouseEnter}
				onMouseLeave={onMouseLeave}
				ariaTitle={encodeCategoryAriaTitle}
				ariaDescription={encodeCategoryAriaDescription}
				x={encodeX}
				y={encodeY}
				y2={useY2Encoding(barPadding)}
				x2={useX2Encoding(barPadding)}
			/>
		)
	},
)

function useY2Encoding(barPadding: number): MarkEncoding<number> {
	return useCallback(
		({ d, yVertical, yHorizontal, band }) =>
			yHorizontal
				? band() + yHorizontal(d._category) - barPadding
				: yVertical(d.y1),
		[barPadding],
	)
}

function useX2Encoding(barPadding: number): MarkEncoding<number> {
	return useCallback(
		({ d, xVertical, band, xHorizontal }) =>
			xHorizontal
				? xHorizontal(d.y1)
				: band() + xVertical(d._category) - barPadding,
		[barPadding],
	)
}
