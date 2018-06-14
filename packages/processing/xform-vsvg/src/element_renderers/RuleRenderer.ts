import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGRuleItem } from '@gog/scenegraph-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { assertTypeIs, emitMarkGroup, commonProps } from './util'
import { VSvgMarkConverter, translate } from './interfaces'

export class RuleRenderer implements VSvgMarkConverter {
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
				const attrs = commonProps(item)
				if (item.x2 !== undefined) {
					attrs.x2 = item.x2 - x
				}
				if (item.y2 !== undefined) {
					attrs.y2 = item.y2 - y
				}

				const result: VSvgNode = {
					type: 'line',
					attrs,
					transforms: [translate(x, y)],
					channels: item.channels,
					metadata: item.metadata,
				}
				return result
			}),
		)
		return { nodes }
	}
}
