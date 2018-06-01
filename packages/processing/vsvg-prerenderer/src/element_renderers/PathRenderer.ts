import { Path } from 'd3-path'
import { Mark, PathItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class PathRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = PathItem.ITEM_TYPE

	public render(mark: Mark<PathItem>) {
		assertTypeIs(mark, PathRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
