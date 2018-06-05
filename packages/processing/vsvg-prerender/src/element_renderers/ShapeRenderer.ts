import { Path } from 'd3-path'
import { SGMark, SGShapeItem, MarkType } from '@gog/mark-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'
import { copyCommonProps, assertTypeIs } from './util'
import { VSvgMarkPrerenderer } from './interfaces'

export class ShapeRenderer implements VSvgMarkPrerenderer {
	public static TARGET_MARK_TYPE = MarkType.Shape

	public render(mark: SGMark<SGShapeItem>) {
		assertTypeIs(mark, ShapeRenderer.TARGET_MARK_TYPE)
		console.log('RENDER SHAPE', mark)
		// TODO
		return { nodes: [] }
	}
}
