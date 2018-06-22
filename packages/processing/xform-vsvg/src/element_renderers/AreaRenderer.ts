import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGAreaItem } from '@gog/scenegraph-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs, getItemSpace } from './util'
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
			return {
				...a,
				...space.shape,
			}
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
