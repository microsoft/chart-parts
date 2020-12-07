/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	Facet,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { MarkBuilder } from '@chart-parts/builder'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { useEffect } from 'react'

/**
 * Group Mark Component Props
 * @category Mark
 */
export interface GroupProps extends CommonMarkProps {
	clip?: MarkEncoding<boolean>
	cornerRadius?: MarkEncoding<number>
	facet?: Facet
}

/**
 * Group Mark Component
 * @category Mark
 */
export const Group = createMarkComponent<GroupProps>(
	MarkType.Group,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.facet(props.facet)
		}, [mark, props.facet])
		useEffect(() => {
			mark.encode(MarkEncodingKey.clip, props.clip)
		}, [mark, props.clip])
		useEffect(() => {
			mark.encode(MarkEncodingKey.cornerRadius, props.cornerRadius)
		}, [mark, props.cornerRadius])
	},
)
