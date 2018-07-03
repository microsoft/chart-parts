import { MarkType, SGMark, SGTrailItem } from '@gog/interfaces'
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
