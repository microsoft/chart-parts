import { Path } from 'd3-path'
import { SGMark, SGSymbolItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { emitMarkGroup, copyCommonProps, assertTypeIs } from './util'
import { symbol } from '../path'

export class SymbolRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Symbol

	public render(mark: SGMark<SGSymbolItem>) {
		assertTypeIs(mark, SymbolRenderer.TARGET_MARK_TYPE)

		return emitMarkGroup(
			MarkType.Rect,
			mark.role,
			mark.items.map(item => {
				const { x = 0, y = 0 } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						d: symbol(item, undefined).toString(),
						origin: [x, y],
					},
				}
				copyCommonProps(item, result)
				return result
			}),
		)
	}
}
