import { MarkType, SGMark, SGPathItem, VSvgNode } from '@chart-parts/interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { VSvgMarkConverter, translate } from './interfaces'

export class PathRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Path

	public render(mark: SGMark<SGPathItem>) {
		assertTypeIs(mark, PathRenderer.TARGET_MARK_TYPE)

		const nodes = emitMarkGroup(
			MarkType.Path,
			mark.role,
			mark.items.map(item => {
				const { x, y } = item
				const result: VSvgNode = {
					type: 'path',
					attrs: { ...commonProps(item), d: item.path },
					transforms: [translate(x || 0, y || 0)],
					metadata: item.metadata,
					channels: item.channels,
					title: item.ariaTitle,
					description: item.ariaDescription,
				}
				return result
			}),
		)
		return { nodes }
	}
}
