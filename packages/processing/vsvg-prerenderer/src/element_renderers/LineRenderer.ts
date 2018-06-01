import { Path } from 'd3-path'
import { SGMark, SGLineItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export class LineRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Line

	public render(mark: SGMark<SGLineItem>) {
		assertTypeIs(mark, LineRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
