import { Item } from './Item'
import {
	SGImageItem,
	HorizontalAlignment,
	VerticalAlignment,
	MarkType,
} from '@gog/mark-interfaces'

export class ImageItem extends Item implements SGImageItem {
	public static ITEM_TYPE = MarkType.Image
	public readonly itemtype: string = ImageItem.ITEM_TYPE

	public url?: string
	public aspect?: boolean = true
	public align?: HorizontalAlignment = HorizontalAlignment.LEFT
	public baseline?: VerticalAlignment = VerticalAlignment.TOP
}
