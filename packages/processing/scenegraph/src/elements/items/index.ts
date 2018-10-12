/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ArcItem } from './ArcItem'
import { AreaItem } from './AreaItem'
import { GroupItem } from './GroupItem'
import { LineItem } from './LineItem'
import { PathItem } from './PathItem'
import { RectItem } from './RectItem'
import { RuleItem } from './RuleItem'
import { SymbolItem } from './SymbolItem'
import { TextItem } from './TextItem'

// Register the core item types
import { registerItemType } from '../../registry'
registerItemType(ArcItem)
registerItemType(AreaItem)
registerItemType(GroupItem)
registerItemType(LineItem)
registerItemType(PathItem)
registerItemType(RectItem)
registerItemType(RuleItem)
registerItemType(SymbolItem)
registerItemType(TextItem)

export * from './Item'
export {
	ArcItem,
	AreaItem,
	GroupItem,
	LineItem,
	PathItem,
	RectItem,
	RuleItem,
	SymbolItem,
	TextItem,
}
