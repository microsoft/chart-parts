/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, Orientation, Interpolation } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface AreaProps extends CommonMarkProps {
	orient?: MarkEncodingProp<Orientation>
	interpolate?: MarkEncodingProp<Interpolation>
	tension?: MarkEncodingProp<number>
	defined?: MarkEncodingProp<boolean>
}

export const Area = createMarkComponent<AreaProps>(
	MarkType.Area,
	({ orient, interpolate, tension, defined }) => ({
		orient,
		interpolate,
		tension,
		defined,
	}),
)
