import { Path } from 'd3-path'
import { SGMark, SGTrailItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { VSvgMarkPrerenderer } from './interfaces'

export class TrailRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Trail

	public render(mark: SGMark<SGTrailItem>) {
		assertTypeIs(mark, TrailRenderer.TARGET_MARK_TYPE)
		// TODO
		return { nodes: [] }
	}
}
