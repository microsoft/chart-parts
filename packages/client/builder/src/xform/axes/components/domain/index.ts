/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Axis, MarkType } from '@chart-parts/interfaces'
import { buildMark } from '@chart-parts/scenegraph'
import { AxisContext, AxisComponent } from '../../interfaces'
import { crossValue } from './crossValue'

/**
 * @ignore
 */
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
