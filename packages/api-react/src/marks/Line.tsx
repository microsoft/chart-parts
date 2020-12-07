/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	Interpolation,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { useEffect } from 'react'
import { MarkBuilder } from '@chart-parts/builder'

/**
 * Line Mark Component Props
 * @category Mark
 */
export interface LineProps extends CommonMarkProps {
	interpolate?: MarkEncoding<Interpolation>
	tension?: MarkEncoding<number>
	defined?: MarkEncoding<boolean>
}

/**
 * Line Mark Component
 * @category Mark
 */
export const Line = createMarkComponent<LineProps>(
	MarkType.Line,
	(mark: MarkBuilder, props) => {
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
