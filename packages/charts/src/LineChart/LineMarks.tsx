/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, { memo } from 'react'
import { ChannelHandler, MarkEncoding, Gradient } from '@chart-parts/interfaces'
import { Line } from '@chart-parts/react'

export interface LineMarksProps {
	onClick?: ChannelHandler<React.MouseEvent<any>>
	onMouseEnter?: ChannelHandler<React.MouseEvent<any>>
	onMouseLeave?: ChannelHandler<React.MouseEvent<any>>
	stroke?: MarkEncoding<string | Gradient>
	strokeWidth?: MarkEncoding<number>
}

const DEFAULT_STROKE: MarkEncoding<string | Gradient> = ctx =>
	ctx.color(ctx.d._category)
const DEFAULT_STROKE_WIDTH = 2

const encodeX: MarkEncoding<number> = ({ d, x }) => x(d.key)
const encodeY: MarkEncoding<number> = ({ d, y }) => y(d.value)

export const LineMarks: React.FC<LineMarksProps> = memo(function LineMarks({
	onClick,
	onMouseEnter,
	onMouseLeave,
	stroke = DEFAULT_STROKE,
	strokeWidth = DEFAULT_STROKE_WIDTH,
}) {
	return (
		<Line
			table="faceted"
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			stroke={stroke}
			strokeWidth={strokeWidth}
			x={encodeX}
			y={encodeY}
		/>
	)
})
