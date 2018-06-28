import { MarkType } from '@gog/interfaces'
import { SGMark, SGArcItem } from '@gog/interfaces'
import { VSvgNode } from '@gog/interfaces'
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
						d: arc(item),
					},
					transforms: [translate(x, y)],
					channels: item.channels,
					metadata: item.metadata,
				}
				return result
			}),
		)
		return { nodes }
	}
}
