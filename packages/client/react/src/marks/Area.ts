/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, Orientation, Interpolation } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface AreaProps extends CommonMarkProps {
	orient?: MarkEncodingProp<Orientation>
	interpolate?: MarkEncodingProp<Interpolation>
	tension?: MarkEncodingProp<number>
	defined?: MarkEncodingProp<boolean>
}

export class Area extends BaseMark<AreaProps> {
	public markType = MarkType.Area

	protected encodeCustomProperties() {
		const { orient, interpolate, tension, defined } = this.props
		return {
			orient,
			interpolate,
			tension,
			defined,
		}
	}
}
