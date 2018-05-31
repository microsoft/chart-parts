import { Item } from './Item'
import { HorizontalAlignment, VerticalAlignment } from '@gog/core'

/**
 * Image marks allow external images, such as icons or photographs, to be included in visualizations.
 * Image files such as PNG or JPG images are loaded from provided URLs.
 */
export class ImageItem extends Item {
	public static ITEM_TYPE = 'image'
	public readonly itemType: string = ImageItem.ITEM_TYPE

	/**
	 * The URL of the image file.
	 */
	public url?: string

	/**
	 * A boolean flag (default true) indicating if the image aspect ratio should be preserved.
	 */
	public aspect?: boolean = true

	/**
	 * The horizontal alignment of the image. One of left, center, or right. The default value is left.
	 */
	public align?: HorizontalAlignment = HorizontalAlignment.LEFT

	/**
	 * The vertical alignment of the image. One of top, middle, or bottom. The default value is top.
	 */
	public baseline?: VerticalAlignment = VerticalAlignment.TOP
}
