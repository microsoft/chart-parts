import { Path } from 'd3-path'
import { SGMark, SGRuleItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs, emitMarkGroup } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { VSvgMarkPrerenderer } from './interfaces'

export class RuleRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Rule

	public render(mark: SGMark<SGRuleItem>) {
		assertTypeIs(mark, RuleRenderer.TARGET_MARK_TYPE)

		// Render each item embedded in this mark
		const nodes = emitMarkGroup(
			MarkType.Rule,
			mark.role,
			mark.items.map(item => {
				const x = item.x || 0
				const y = item.y || 0
				const result: VSvgNode = {
					type: 'line',
					attrs: {
						origin: [x, y],
					},
				}

				if (item.x2 !== undefined) {
					result.attrs.x2 = item.x2 - x
				}
				if (item.y2 !== undefined) {
					result.attrs.y2 = item.y2 - y
				}

				copyCommonProps(item, result)
				return result
			}),
		)
		return { nodes }
	}
}
