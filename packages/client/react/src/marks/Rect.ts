/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncodingProp<number>
}

export const Rect = createMarkComponent<RectProps>(
	MarkType.Rect,
	({ cornerRadius }) => ({
		cornerRadius,
	}),
)
