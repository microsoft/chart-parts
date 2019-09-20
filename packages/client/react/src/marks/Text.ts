/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	HorizontalAlignment,
	VerticalTextAlignment,
	TextDirection,
	FontWeight,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { MarkBuilder } from '@chart-parts/builder'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { useEffect } from 'react'

/**
 * Text Mark Component Props
 * @category Mark
 */
export interface TextProps extends CommonMarkProps {
	align?: MarkEncoding<HorizontalAlignment>
	angle?: MarkEncoding<number>
	baseline?: MarkEncoding<VerticalTextAlignment>
	dir?: MarkEncoding<TextDirection>
	dx?: MarkEncoding<number>
	dy?: MarkEncoding<number>
	ellipsis?: MarkEncoding<string>
	font?: MarkEncoding<string>
	fontSize?: MarkEncoding<number>
	fontWeight?: MarkEncoding<FontWeight>
	fontVariant?: MarkEncoding<string | number>
	fontStyle?: MarkEncoding<number>
	limit?: MarkEncoding<number>
	radius?: MarkEncoding<number>
	text?: MarkEncoding<string>
	theta?: MarkEncoding<number>
}

/**
 * Text Mark Component
 * @category Mark
 */
export const Text = createMarkComponent<TextProps>(
	MarkType.Text,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.align, props.align)
		}, [mark, props.align])
		useEffect(() => {
			mark.encode(MarkEncodingKey.angle, props.angle)
		}, [mark, props.angle])
		useEffect(() => {
			mark.encode(MarkEncodingKey.baseline, props.baseline)
		}, [mark, props.baseline])
		useEffect(() => {
			mark.encode(MarkEncodingKey.dir, props.dir)
		}, [mark, props.dir])
		useEffect(() => {
			mark.encode(MarkEncodingKey.dx, props.dx)
		}, [mark, props.dx])
		useEffect(() => {
			mark.encode(MarkEncodingKey.dy, props.dy)
		}, [mark, props.dy])
		useEffect(() => {
			mark.encode(MarkEncodingKey.ellipsis, props.ellipsis)
		}, [mark, props.ellipsis])
		useEffect(() => {
			mark.encode(MarkEncodingKey.font, props.font)
		}, [mark, props.font])
		useEffect(() => {
			mark.encode(MarkEncodingKey.fontWeight, props.fontWeight)
		}, [mark, props.fontWeight])
		useEffect(() => {
			mark.encode(MarkEncodingKey.fontVariant, props.fontVariant)
		}, [mark, props.fontVariant])
		useEffect(() => {
			mark.encode(MarkEncodingKey.fontStyle, props.fontStyle)
		}, [mark, props.fontStyle])
		useEffect(() => {
			mark.encode(MarkEncodingKey.limit, props.limit)
		}, [mark, props.limit])
		useEffect(() => {
			mark.encode(MarkEncodingKey.radius, props.radius)
		}, [mark, props.radius])
		useEffect(() => {
			mark.encode(MarkEncodingKey.text, props.text)
		}, [mark, props.text])
		useEffect(() => {
			mark.encode(MarkEncodingKey.theta, props.theta)
		}, [mark, props.theta])
	},
)
