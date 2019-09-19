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
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { MarkBuilder } from '@chart-parts/builder'
import { useEffect } from 'react'

/**
 * SymbolOfType Component Props
 * @category Mark
 */
export interface SymbolOfTypeProps extends CommonMarkProps {
	size?: MarkEncoding<number>
}

/**
 * A factory function for creating a symbol component
 * @param shape The shape to use
 */
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

/**
 * Circle Symbol Component
 * @category Mark
 */
export const Circle = createSymbolMark(SymbolType.Circle)

/**
 * Cross Symbol Component
 * @category Mark
 */
export const Cross = createSymbolMark(SymbolType.Cross)

/**
 * Diamond Symbol Component
 * @category Mark
 */
export const Diamond = createSymbolMark(SymbolType.Diamond)

/**
 * Square Symbol Component
 * @category Mark
 */
export const Square = createSymbolMark(SymbolType.Square)

/**
 * Triangle-Down Symbol Component
 * @category Mark
 */
export const TriangleDown = createSymbolMark(SymbolType.TriangleDown)

/**
 * Triangle-Up Symbol Component
 * @category Mark
 */
export const TriangleUp = createSymbolMark(SymbolType.TriangleUp)

/**
 * Triangle-Left Symbol Component
 * @category Mark
 */
export const TriangleLeft = createSymbolMark(SymbolType.TriangleLeft)

/**
 * Triangle-Right Symbol Component
 * @category Mark
 */
export const TriangleRight = createSymbolMark(SymbolType.TriangleRight)
