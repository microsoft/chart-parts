import {
	MarkType,
	SGMark,
	SGAreaItem,
	getItemSpace,
} from '@markable/interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { area } from '../path'
import { VSvgMarkConverter } from './interfaces'

export class AreaRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Area

	public render(mark: SGMark<SGAreaItem>) {
		assertTypeIs(mark, AreaRenderer.TARGET_MARK_TYPE)

		if (mark.items.map.length === 0) {
			return { nodes: [] }
		}

		const areaItems = mark.items.map(a => {
			const space = getItemSpace(a)
			const ai = a as any
			ai.width = space.shape.width
			ai.height = space.shape.height
			return ai
		})

		const areaItem = {
			type: 'path',
			attrs: {
				d: area(areaItems),
			},
			metadata: areaItems[0].metadata,
			channels: areaItems[0].channels,
		}

		mark.items.forEach(
			item =>
				(areaItem.attrs = {
					...areaItem.attrs,
					...commonProps(item),
				}),
		)

		const nodes = emitMarkGroup(MarkType.Area, mark.role, [areaItem])
		return { nodes }
	}
}
