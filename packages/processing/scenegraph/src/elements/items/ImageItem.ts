import {
	MarkType,
	HorizontalAlignment,
	VerticalAlignment,
} from '@gog/mark-interfaces'
import { SGImageItem } from '@gog/scenegraph-interfaces'
import { Item } from './Item'

export class ImageItem extends Item implements SGImageItem {
	public static ITEM_TYPE = MarkType.Image
	public readonly itemtype: string = ImageItem.ITEM_TYPE

	public url?: string
	public aspect?: boolean = true
	public align?: HorizontalAlignment = HorizontalAlignment.LEFT
	public baseline?: VerticalAlignment = VerticalAlignment.TOP
}
