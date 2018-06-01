import { Path } from 'd3-path'
import { Mark, ImageItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class ImageRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = ImageItem.ITEM_TYPE

	public render(mark: Mark<ImageItem>) {
		assertTypeIs(mark, ImageRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
