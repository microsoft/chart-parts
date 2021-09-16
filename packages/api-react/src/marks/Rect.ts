/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkBuilder } from '@chart-parts/builder'
import {
	MarkType,
	MarkEncodingKey,
	MarkEncoding,
} from '@chart-parts/interfaces'
import { useEffect } from 'react'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'

/**
 * Rect Mark Component Props
 * @category Mark
 */
export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncoding<number>
}

/**
 * Rect Mark Component
 * @category Mark
 */
export const Rect = createMarkComponent<RectProps>(
	MarkType.Rect,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.cornerRadius, props.cornerRadius)
		}, [mark, props.cornerRadius])
	},
)
