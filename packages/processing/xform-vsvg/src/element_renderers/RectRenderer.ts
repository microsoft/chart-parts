import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGRectItem } from '@gog/scenegraph-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { commonProps, assertTypeIs, emitMarkGroup, getItemSpace } from './util'
import { rectangle } from '../path'
import { VSvgMarkConverter } from './interfaces'

export class RectRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Rect

	public render(mark: SGMark<SGRectItem>) {
		assertTypeIs(mark, RectRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Rect,
			mark.role,
			mark.items.map(item => {
				const space = getItemSpace(item)
				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: rectangle(
							{ ...item, ...space.shape },
							space.origin.x,
							space.origin.y,
						).toString(),
					},
					metadata: item.metadata,
					channels: item.channels,
				}
				return result
			}),
		)
		return { nodes }
	}
}
