/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, SymbolType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface SymbolProps extends CommonMarkProps {
	size?: MarkEncodingProp<number>
	shape?: MarkEncodingProp<SymbolType | string>
}

export const Symbol = createMarkComponent<SymbolProps>(
	MarkType.Symbol,
	({ size, shape }) => ({ size, shape }),
)
