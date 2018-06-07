import { MarkType } from '@gog/mark-interfaces'
import { SGItem } from '@gog/scenegraph-interfaces'
import * as Elements from './elements'

/**
 * Thunk over ot the registry's createItem for now
 */
export { createItemType as createItem } from './registry'

/**
 *
 * @param markType The type of mark item to create
 * @param item The mark items to add
 */
export function createMark(markType: MarkType, items: SGItem[]) {
	items.forEach((item, index) => {
		if (item.itemtype !== markType) {
			throw new Error(
				`Mark type must match the type of it's child items. Mark ${markType}, child ${
					item.itemtype
				}@${index}`,
			)
		}
	})
	const result = new Elements.Mark()
	result.marktype = markType
	result.items = items
	return result
}
