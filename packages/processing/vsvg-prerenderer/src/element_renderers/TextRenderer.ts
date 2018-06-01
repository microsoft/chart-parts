import { Path } from 'd3-path'
import { SGMark, SGTextItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'

export class TextRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = MarkType.Text

	public render(mark: SGMark<SGTextItem>) {
		assertTypeIs(mark, TextRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
