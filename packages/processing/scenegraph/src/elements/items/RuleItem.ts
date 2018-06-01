import { Item } from './Item'

/**
 * Rule marks provide a convenient way to draw individual line segments.
 * A rule is simply a line from (x, y) to (x2, y2).
 * One of the primary uses of rule marks is to draw axis ticks and grid lines.
 */
export class RuleItem extends Item {
	public static ITEM_TYPE = 'rule'
	public readonly itemtype: string = RuleItem.ITEM_TYPE
}
