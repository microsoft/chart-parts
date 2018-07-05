import { Axis, MarkType } from '@gog/interfaces'
import { buildMark } from '@gog/scenegraph'
import { AxisContext, AxisComponent } from '../../interfaces'
import { crossValue } from './crossValue'

export class Domain implements AxisComponent {
	public createContext(context: Partial<AxisContext>) {
		const range = context.range as [number, number]
		const maxRange = Math.max(...range)
		const minRange = Math.min(...range)

		return {
			...context,
			domainMinRange: minRange,
			domainMaxRange: maxRange,
			domainCross: crossValue(
				context.axis as Axis,
				context.thickness as number,
			),
		}
	}

	public isScenegraphElementGenerated(context: AxisContext) {
		return !!context.axis.domain
	}

	public createScenegraphElement(context: AxisContext) {
		const {
			axis,
			rangeProperty,
			rangeEndProperty,
			crossProperty,
			domainCross,
			domainMinRange,
			domainMaxRange,
		} = context
		return buildMark(MarkType.Rule)
			.role('axis-domain')
			.items({
				stroke: axis.domainColor,
				strokeWidth: axis.domainWidth,
				[rangeProperty]: domainMinRange,
				[rangeEndProperty]: domainMaxRange + (axis.domainWidth as number),
				[crossProperty]: domainCross,
			})
			.build()
	}
}
