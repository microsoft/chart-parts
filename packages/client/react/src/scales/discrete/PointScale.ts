/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Dimension } from '@chart-parts/interfaces'
import { point } from '@chart-parts/scales'
import {
	createDomainRangeScale,
	DomainRangeScaleProps,
} from '../DomainRangeScale'

export interface PointScaleProps
	extends DomainRangeScaleProps<string[], [number, number], Dimension> {
	/**
	 * The name of the Point-width static scale
	 */
	stepName?: string

	/**
	 * Bin alignment 0-beginning, 1=end
	 */
	align?: number

	/**
	 * The outer and inner padding value
	 */
	padding?: number
}

export const PointScale: React.FC<PointScaleProps> = createDomainRangeScale(
	'PointScale',
	({
		stepName: stepNameProp,
		name,
		domain,
		range,
		align,
		padding,
		reverse,
	}) => {
		const stepName = stepNameProp || name + 'Step'
		return point(name)
			.domain(domain)
			.range(range)
			.stepName(stepName)
			.align(align)
			.padding(padding)
			.reverse(reverse)
	},
)
