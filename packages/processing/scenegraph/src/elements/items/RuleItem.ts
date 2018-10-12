/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType, SGRuleItem } from '@chart-parts/interfaces'
import { Item } from './Item'

export class RuleItem extends Item implements SGRuleItem {
	public static ITEM_TYPE = MarkType.Rule
	public readonly itemtype = RuleItem.ITEM_TYPE
}
