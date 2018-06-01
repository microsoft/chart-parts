import { Path } from 'd3-path'
import { Mark, GroupItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'

export class GroupRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = GroupItem.ITEM_TYPE

	public render(mark: Mark<GroupItem>) {
		assertTypeIs(mark, GroupRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
