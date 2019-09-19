/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, Orientation, Interpolation } from '@chart-parts/interfaces'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { useEffect } from 'react'
import { MarkBuilder } from '@chart-parts/builder'
import { MarkEncodingKey, MarkEncoding } from '@chart-parts/interfaces'

/**
 * Area Mark Component Props
 * @category Mark
 */
export interface AreaProps extends CommonMarkProps {
	orient?: MarkEncoding<Orientation>
	interpolate?: MarkEncoding<Interpolation>
	tension?: MarkEncoding<number>
	defined?: MarkEncoding<boolean>
}

/**
 * Area Mark Component
 * @category Mark
 */
export const Area = createMarkComponent<AreaProps>(
	MarkType.Area,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.orient, props.orient)
		}, [mark, props.orient])
		useEffect(() => {
			mark.encode(MarkEncodingKey.interpolate, props.interpolate)
		}, [mark, props.interpolate])
		useEffect(() => {
			mark.encode(MarkEncodingKey.tension, props.tension)
		}, [mark, props.tension])
		useEffect(() => {
			mark.encode(MarkEncodingKey.defined, props.defined)
		}, [mark, props.defined])
	},
)
