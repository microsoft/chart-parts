/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { MarkBuilder } from '@chart-parts/builder'
import { useEffect } from 'react'

/**
 * Arc Mark Props
 * @category Mark
 */
export interface ArcProps extends CommonMarkProps {
	startAngle?: MarkEncoding<number>
	endAngle?: MarkEncoding<number>
	padAngle?: MarkEncoding<number>
	innerRadius?: MarkEncoding<number>
	outerRadius?: MarkEncoding<number>
	cornerRadius?: MarkEncoding<number>
}

/**
 * Arc Mark Component
 * @category Mark
 */
export const Arc = createMarkComponent<ArcProps>(
	MarkType.Arc,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.startAngle, props.startAngle)
		}, [mark, props.startAngle])
		useEffect(() => {
			mark.encode(MarkEncodingKey.endAngle, props.endAngle)
		}, [mark, props.endAngle])
		useEffect(() => {
			mark.encode(MarkEncodingKey.padAngle, props.padAngle)
		}, [mark, props.padAngle])
		useEffect(() => {
			mark.encode(MarkEncodingKey.innerRadius, props.innerRadius)
		}, [mark, props.innerRadius])
		useEffect(() => {
			mark.encode(MarkEncodingKey.outerRadius, props.outerRadius)
		}, [mark, props.outerRadius])
		useEffect(() => {
			mark.encode(MarkEncodingKey.cornerRadius, props.cornerRadius)
		}, [mark, props.cornerRadius])
	},
)
