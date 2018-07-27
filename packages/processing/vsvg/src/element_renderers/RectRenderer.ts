import {
	MarkType,
	SGMark,
	SGRectItem,
	getItemSpace,
	VSvgNode,
} from '@gog/interfaces'
import { commonProps, assertTypeIs, emitMarkGroup } from './util'
import { rectangle } from '../path'
import { VSvgMarkConverter } from './interfaces'

declare var require: any
// tslint:disable-next-line no-var-requires no-submodule-imports
const assign = require('lodash/assign')

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
					attrs: assign({}, commonProps(item), {
						d: rectangle(
							assign({}, item, space.shape),
							space.origin.x,
							space.origin.y,
						).toString(),
					}),
					metadata: item.metadata,
					channels: item.channels,
				}
				return result
			}),
		)
		return { nodes }
	}
}
