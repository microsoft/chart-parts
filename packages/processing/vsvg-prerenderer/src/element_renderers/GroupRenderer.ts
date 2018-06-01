import { Path } from 'd3-path'
import { SGMark, SGGroupItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'

export class GroupRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Group

	public render(mark: SGMark<SGGroupItem>) {
		assertTypeIs(mark, GroupRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
