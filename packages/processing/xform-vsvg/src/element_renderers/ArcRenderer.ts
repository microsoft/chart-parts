import { Path } from 'd3-path'
import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGArcItem } from '@gog/scenegraph-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { arc } from '../path'
import { VSvgMarkConverter, translate } from './interfaces'

export class ArcRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Arc

	public render(mark: SGMark<SGArcItem>) {
		assertTypeIs(mark, ArcRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Arc,
			mark.role,
			mark.items.map(item => {
				const { x = 0, y = 0 } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: arc(item, null).toString(),
					},
					transforms: [translate(x, y)],
				}
				return result
			}),
		)
		return { nodes }
	}
}
