/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	MarkEncodingKey,
	MarkEncoding,
} from '@chart-parts/interfaces'
import { CommonMarkProps } from '../interfaces'
import { createMarkComponent } from './BaseMark'
import { MarkBuilder } from '@chart-parts/builder'
import { useEffect } from 'react'

export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncoding<number>
}

export const Rect = createMarkComponent<RectProps>(
	MarkType.Rect,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.cornerRadius, props.cornerRadius)
		}, [mark, props.cornerRadius])
	},
)
