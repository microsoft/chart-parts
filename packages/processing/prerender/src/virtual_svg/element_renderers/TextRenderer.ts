import { Path } from 'd3-path'
import { Mark, TextItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '../../interfaces'

export class TextRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = TextItem.ITEM_TYPE

	public render(mark: Mark<TextItem>) {
		assertTypeIs(mark, TextRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
