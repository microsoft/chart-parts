/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	SymbolType,
	MarkEncodingKey,
	MarkEncoding,
} from '@chart-parts/interfaces'
import { CommonMarkProps } from '../interfaces'
import { createMarkComponent } from './BaseMark'
import { useEffect } from 'react'
import { MarkBuilder } from '@chart-parts/builder'

export interface SymbolProps extends CommonMarkProps {
	size?: MarkEncoding<number>
	shape?: MarkEncoding<SymbolType | string>
}

export const Symbol = createMarkComponent<SymbolProps>(
	MarkType.Symbol,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.size, props.size)
		}, [mark, props.size])
		useEffect(() => {
			mark.encode(MarkEncodingKey.shape, props.shape)
		}, [mark, props.shape])
	},
)
