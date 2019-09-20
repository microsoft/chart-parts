/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ordinal, CategoricalColorScheme } from '@chart-parts/scales'
import { createDomainScale, DomainScaleProps } from '../DomainScale'

/**
 * OrdinalScale Component Props
 * @category Scale
 */
export interface OrdinalScaleProps<RangeType>
	extends DomainScaleProps<string[]> {
	/**
	 * The range of values to map to
	 */
	range?: RangeType[]

	/**
	 * The color scheme to use as the target ordinal domain
	 */
	colorScheme?: CategoricalColorScheme
}

/**
 * Generic Ordinal Scale Typing
 * @category Scale
 */
export type OrdinalScaleComponentType<RangeType = any> = React.FC<
	OrdinalScaleProps<RangeType>
>

/**
 * Ordinal Scale Component
 * @category Scale
 * @remarks Based on [d3 Ordinal Scale](https://github.com/d3/d3-scale#scaleOrdinal)
 */
export const OrdinalScale: OrdinalScaleComponentType = createDomainScale(
	'OrdinalScale',
	({ name, domain, range, colorScheme }) =>
		ordinal(name)
			.domain(domain)
			.range(range)
			.colorScheme(colorScheme),
	['name', 'domain', 'range', 'colorScheme'],
)
