import { MarkType } from '@gog/mark-interfaces'
import { SGRuleItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class RuleItem extends Item implements SGRuleItem {
	public static ITEM_TYPE = MarkType.Rule
	public readonly itemtype: string = RuleItem.ITEM_TYPE
}
