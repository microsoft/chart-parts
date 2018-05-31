import { ArcItem } from './ArcItem'
import { AreaItem } from './AreaItem'
import { GroupItem } from './GroupItem'
import { ImageItem } from './ImageItem'
import { LineItem } from './LineItem'
import { PathItem } from './PathItem'
import { RectItem } from './RectItem'
import { RuleItem } from './RuleItem'
import { SymbolItem } from './SymbolItem'
import { TextItem } from './TextItem'
import { TrailItem } from './TrailItem'

// Register the core item types
import { registerItemType } from '../../registry'
registerItemType(ArcItem)
registerItemType(AreaItem)
registerItemType(GroupItem)
registerItemType(ImageItem)
registerItemType(LineItem)
registerItemType(PathItem)
registerItemType(RectItem)
registerItemType(RuleItem)
registerItemType(SymbolItem)
registerItemType(TextItem)
registerItemType(TrailItem)

export * from './Item'
export {
	ArcItem,
	AreaItem,
	GroupItem,
	ImageItem,
	LineItem,
	PathItem,
	RectItem,
	RuleItem,
	SymbolItem,
	TextItem,
	TrailItem,
}
