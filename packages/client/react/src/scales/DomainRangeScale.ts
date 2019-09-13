/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleCreationContext } from '@chart-parts/interfaces'
import { createDomainScale, DomainScaleProps } from './DomainScale'

export interface DomainRangeScaleProps<Domain, Range, RangeBind>
	extends DomainScaleProps<Domain> {
	/**
	 * Sets the range of the scale.
	 *
	 * If an array is provided, it is treated as an explicit range value.
	 * If a function is proveded, it is treated as a factory function for generating the range.
	 * If any other value is provided, it is treated as a "range binder" and its behavior is
	 * dependent on the scale implementation.
	 */
	range?: RangeBind | ((args: ScaleCreationContext) => Range) | Range

	/**
	 * Reverse the range
	 */
	reverse?: boolean
}

export function createDomainRangeScale<
	Props extends DomainRangeScaleProps<Domain, Range, RangeBind>,
	Domain,
	Range,
	RangeBind
>(displayName: string, createScale: (props: Props) => any) {
	return createDomainScale<Props, Domain>(displayName, createScale)
}
