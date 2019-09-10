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
} from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface TextProps extends CommonMarkProps {
	align?: MarkEncodingProp<HorizontalAlignment>
	angle?: MarkEncodingProp<number>
	baseline?: MarkEncodingProp<VerticalTextAlignment>
	dir?: MarkEncodingProp<TextDirection>
	dx?: MarkEncodingProp<number>
	dy?: MarkEncodingProp<number>
	ellipsis?: MarkEncodingProp<string>
	font?: MarkEncodingProp<string>
	fontSize?: MarkEncodingProp<number>
	fontWeight?: MarkEncodingProp<FontWeight>
	fontVariant?: MarkEncodingProp<string | number>
	fontStyle?: MarkEncodingProp<number>
	limit?: MarkEncodingProp<number>
	radius?: MarkEncodingProp<number>
	text?: MarkEncodingProp<string>
	theta?: MarkEncodingProp<number>
}

export const Text = createMarkComponent<TextProps>(
	MarkType.Text,
	({
		align,
		angle,
		baseline,
		dir,
		dx,
		dy,
		ellipsis,
		font,
		fontSize,
		fontWeight,
		fontVariant,
		fontStyle,
		limit,
		radius,
		text,
		theta,
	}) => ({
		align,
		angle,
		baseline,
		dir,
		dx,
		dy,
		ellipsis,
		font,
		fontSize,
		fontWeight,
		fontVariant,
		fontStyle,
		limit,
		radius,
		text,
		theta,
	}),
)
