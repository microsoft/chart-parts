/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { MarkType, SymbolType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface SymbolOfTypeProps extends CommonMarkProps {
	size?: MarkEncodingProp<number>
}

function createSymbolMark(shape: SymbolType) {
	return createMarkComponent<SymbolOfTypeProps>(
		MarkType.Symbol,
		({ size }) => ({
			size,
			shape,
		}),
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
