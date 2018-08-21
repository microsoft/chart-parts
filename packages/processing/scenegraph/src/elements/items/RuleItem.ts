import { MarkType, SGRuleItem } from '@markable/interfaces'
import { Item } from './Item'

export class RuleItem extends Item implements SGRuleItem {
	public static ITEM_TYPE = MarkType.Rule
	public readonly itemtype: string = RuleItem.ITEM_TYPE
}
