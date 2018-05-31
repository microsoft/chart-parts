import { Path } from 'd3-path'
import { Mark, RectItem } from '@gog/scenegraph'
import { rectangle } from '../path/shapes'
import { MarkPrerenderer } from '../../interfaces'
import { VirtualDomNode } from '@gog/vdom-interfaces'

export class RectRenderer implements MarkPrerenderer<VirtualDomNode[]> {
	public render(mark: Mark) {
		if (mark.marktype !== RectItem.ITEM_TYPE) {
			throw new Error(`Mark must be of type ${RectItem.ITEM_TYPE}`)
		}

		// Render each item embedded in this mark
		const renderedItems: VirtualDomNode[] = mark.items.map((item: RectItem) => {
			const rendered = rectangle(item)
			const result: VirtualDomNode = {
				type: 'path',
				attrs: { d: rendered.toString() },
			}
			if (item.fill) {
				result.attrs.fill = item.fill
			}
			if (item.fillOpacity) {
				result.attrs['fill-opacity'] = item.fillOpacity
			}
			if (item.stroke) {
				result.attrs.stroke = item.stroke
			}
			if (item.strokeWidth) {
				result.attrs['stroke-width'] = item.strokeWidth
			}
			if (item.strokeOpacity) {
				result.attrs['stroke-opacity'] = item.strokeOpacity
			}
			if (item.strokeJoin) {
				result.attrs['stroke-linejoin'] = item.strokeJoin
			}
			if (item.strokeCap) {
				result.attrs['stroke-linecap'] = item.strokeCap
			}
			if (item.strokeDash) {
				result.attrs['stroke-dasharray'] = item.strokeDash.join(',')
			}
			if (item.strokeDashOffset) {
				result.attrs['stroke-dashoffset'] = item.strokeDashOffset
			}
			return result
		})

		return renderedItems
	}
}
