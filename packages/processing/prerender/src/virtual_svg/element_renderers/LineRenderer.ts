import { Path } from 'd3-path'
import { Mark, LineItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '../../interfaces'

export class LineRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = LineItem.ITEM_TYPE

	public render(mark: Mark<LineItem>) {
		assertTypeIs(mark, LineRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
