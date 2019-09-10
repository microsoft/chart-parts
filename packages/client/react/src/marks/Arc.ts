/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface ArcProps extends CommonMarkProps {
	startAngle?: MarkEncodingProp<number>
	endAngle?: MarkEncodingProp<number>
	padAngle?: MarkEncodingProp<number>
	innerRadius?: MarkEncodingProp<number>
	outerRadius?: MarkEncodingProp<number>
	cornerRadius?: MarkEncodingProp<number>
}

export const Arc = createMarkComponent<ArcProps>(
	MarkType.Arc,
	({
		startAngle,
		endAngle,
		padAngle,
		innerRadius,
		outerRadius,
		cornerRadius,
	}) => ({
		startAngle,
		endAngle,
		padAngle,
		innerRadius,
		outerRadius,
		cornerRadius,
	}),
)
