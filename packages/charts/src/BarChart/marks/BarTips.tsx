/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	VerticalTextAlignment,
	HorizontalAlignment,
	MarkEncoding,
} from '@chart-parts/interfaces'
import { Text } from '@chart-parts/react'
import React, { useCallback, memo } from 'react'
import { Orientation } from '../../types'

const DEFAULT_TEXT: MarkEncoding<string> = ({ d, index }) => d.data[index].value
const DEFAULT_FILL = 'black'

export interface BarTipsProps {
	index?: number
	fill?: string
	text?: MarkEncoding<string>
}

export const BarTips: React.FC<BarTipsProps> = memo(function BarTips({
	index,
	fill = DEFAULT_FILL,
	text = DEFAULT_TEXT,
}) {
	const encodeX = useXEncoding(index)
	const encodeY = useYEncoding(index)
	return index == null ? null : (
		<Text
			text={text}
			fill={fill}
			x={encodeX}
			y={encodeY}
			baseline={VerticalTextAlignment.Alphabetic}
			align={HorizontalAlignment.Center}
		/>
	)
})

function useXEncoding(index = 0): MarkEncoding<number> {
	return useCallback(
		({ data, x, band }: any) => x(data[index]._key) + band() / 2 - 5,
		[index],
	)
}

function useYEncoding(index = 0): MarkEncoding<number> {
	return useCallback(
		({ data, y, band }: any) => {
			if (data[index]._orientation === Orientation.horizontal) {
				return y(data[index]._value) + band() / 2
			}
			return y(data[index]._value) - band() / 2
		},
		[index],
	)
}
