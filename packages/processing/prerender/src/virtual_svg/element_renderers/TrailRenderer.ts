import { Path } from 'd3-path'
import { Mark, TrailItem } from '@gog/scenegraph'
import { VSvgNode } from '@gog/vdom-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { MarkPrerenderer } from '../../interfaces'

export class TrailRenderer implements MarkPrerenderer<VSvgNode[]> {
	public static TARGET_MARK_TYPE = TrailItem.ITEM_TYPE

	public render(mark: Mark<TrailItem>) {
		assertTypeIs(mark, TrailRenderer.TARGET_MARK_TYPE)
		// TODO
		return []
	}
}
