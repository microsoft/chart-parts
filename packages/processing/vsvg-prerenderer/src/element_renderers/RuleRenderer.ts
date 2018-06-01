import { Path } from 'd3-path'
import { SGMark, SGRuleItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class RuleRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Rule

	public render(mark: SGMark<SGRuleItem>) {
		assertTypeIs(mark, RuleRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
