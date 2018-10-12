/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export type RuleProps = CommonMarkProps

export class Rule extends BaseMark<RuleProps> {
	public markType = MarkType.Rule

	protected encodeCustomProperties() {
		return {}
	}
}
