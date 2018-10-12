/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface RectProps extends CommonMarkProps {
	cornerRadius?: MarkEncodingProp<number>
}

export class Rect extends BaseMark<RectProps> {
	public markType = MarkType.Rect

	protected encodeCustomProperties() {
		return {
			cornerRadius: this.props.cornerRadius,
		}
	}
}
