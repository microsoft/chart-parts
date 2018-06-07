import { Path } from 'd3-path'
import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGTrailItem } from '@gog/scenegraph-interfaces'
import { assertTypeIs } from './util'
import { VSvgMarkConverter } from './interfaces'

export class TrailRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Trail

	public render(mark: SGMark<SGTrailItem>) {
		assertTypeIs(mark, TrailRenderer.TARGET_MARK_TYPE)
		// TODO
		return { nodes: [] }
	}
}
