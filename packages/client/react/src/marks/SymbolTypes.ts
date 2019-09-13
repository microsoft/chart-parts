/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	MarkType,
	SymbolType,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { CommonMarkProps } from '../interfaces'
import { createMarkComponent } from './BaseMark'
import { MarkBuilder } from '@chart-parts/builder'
import { useEffect } from 'react'

export interface SymbolOfTypeProps extends CommonMarkProps {
	size?: MarkEncoding<number>
}

function createSymbolMark(shape: SymbolType) {
	return createMarkComponent<SymbolOfTypeProps>(
		MarkType.Symbol,
		(mark: MarkBuilder, props) => {
			useEffect(() => {
				mark.encode(MarkEncodingKey.size, props.size)
			}, [mark, props.size])
			useEffect(() => {
				mark.encode(MarkEncodingKey.shape, shape)
			}, [mark])
		},
	)
}

export const Circle = createSymbolMark(SymbolType.Circle)
export const Cross = createSymbolMark(SymbolType.Cross)
export const Diamond = createSymbolMark(SymbolType.Diamond)
export const Square = createSymbolMark(SymbolType.Square)
export const TriangleDown = createSymbolMark(SymbolType.TriangleDown)
export const TriangleUp = createSymbolMark(SymbolType.TriangleUp)
export const TriangleLeft = createSymbolMark(SymbolType.TriangleLeft)
export const TriangleRight = createSymbolMark(SymbolType.TriangleRight)
