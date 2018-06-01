import { Path } from 'd3-path'
import { SGMark, SGSymbolItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'

export class SymbolRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Symbol

	public render(mark: SGMark<SGSymbolItem>) {
		assertTypeIs(mark, SymbolRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
