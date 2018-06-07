import { Path } from 'd3-path'
import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGRectItem } from '@gog/scenegraph-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { commonProps, assertTypeIs, emitMarkGroup } from './util'
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
				const { x = 0, y = 0, x2 = 0, y2 = 0 } = item
				const height = item.height || y2 - y
				const width = item.width || x2 - x

				const result: VSvgNode = {
					type: 'path',
					attrs: {
						...commonProps(item),
						d: rectangle({ ...item, width, height }, x, y).toString(),
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
