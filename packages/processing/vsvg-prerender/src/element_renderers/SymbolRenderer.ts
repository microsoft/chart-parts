import { Path } from 'd3-path'
import { SGMark, SGSymbolItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode, VSvgTransformType } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { symbol } from '../path'
import { VSvgMarkPrerenderer, translate } from './interfaces'

export class SymbolRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Symbol

	public render(mark: SGMark<SGSymbolItem>) {
		assertTypeIs(mark, SymbolRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Rect,
			mark.role,
			mark.items.map(item => {
				const { x = 0, y = 0 } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: symbol(item, undefined).toString(),
					},
					transforms: [translate(x, y)],
				}
				return result
			}),
		)
		return { nodes }
	}
}
