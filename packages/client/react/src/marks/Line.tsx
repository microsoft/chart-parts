/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, Interpolation } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface LineProps extends CommonMarkProps {
	interpolate?: MarkEncodingProp<Interpolation>
	tension?: MarkEncodingProp<number>
	defined?: MarkEncodingProp<boolean>
}

export const Line = createMarkComponent<LineProps>(
	MarkType.Line,
	({ interpolate, tension, defined }) => ({
		interpolate,
		tension,
		defined,
	}),
)
