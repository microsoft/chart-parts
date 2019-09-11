/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { ordinal, CategoricalColorScheme } from '@chart-parts/scales'
import { createDomainScale, DomainScaleProps } from '../DomainScale'

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

export type OrdinalScaleComponentType<RangeType = any> = React.FC<
	OrdinalScaleProps<RangeType>
>

export const OrdinalScale: OrdinalScaleComponentType = createDomainScale(
	({ name, domain, range, colorScheme }) => {
		return ordinal(name)
			.domain(domain)
			.range(range)
			.colorScheme(colorScheme)
	},
)
