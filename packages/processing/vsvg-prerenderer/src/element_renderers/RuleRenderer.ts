import { Path } from 'd3-path'
import { Mark, RuleItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class RuleRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = RuleItem.ITEM_TYPE

	public render(mark: Mark<RuleItem>) {
		assertTypeIs(mark, RuleRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
