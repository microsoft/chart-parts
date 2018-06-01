import { Path } from 'd3-path'
import { Mark, SymbolItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '../../interfaces'

export class SymbolRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = SymbolItem.ITEM_TYPE

	public render(mark: Mark<SymbolItem>) {
		assertTypeIs(mark, SymbolRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
