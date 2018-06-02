import { Path } from 'd3-path'
import { SGMark, SGRuleItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs, emitMarkGroup } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class RuleRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Rule

	public render(mark: SGMark<SGRuleItem>) {
		assertTypeIs(mark, RuleRenderer.TARGET_MARK_TYPE)

		// Render each item embedded in this mark
		return emitMarkGroup(
			MarkType.Rule,
			mark.items.map(item => {
				const result: VSvgNode = {
					type: 'line',
					attrs: {
						origin: [item.x || 0, item.y || 0],
						x2: item.x2,
						y2: item.y2,
					},
				}
				copyCommonProps(item, result)
				return result
			}),
		)
	}
}
