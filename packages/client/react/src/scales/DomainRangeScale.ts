/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ScaleCreationContext } from '@chart-parts/interfaces'
import { createDomainScale, DomainScaleProps } from './DomainScale'

/**
 * Common props for scales with both a domain and range
 * @category Scale
 */
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

/**
 * Creates a new domain-range scale
 * @ignore
 * @param displayName The name of the scale to create
 * @param createScale The scale creation function
 * @param propsToCheck The props to check for scale recreation
 */
export function createDomainRangeScale<
	Props extends DomainRangeScaleProps<Domain, Range, RangeBind>,
	Domain,
	Range,
	RangeBind
>(
	displayName: string,
	createScale: (props: Props) => any,
	propsToCheck: string[] = [],
) {
	return createDomainScale<Props, Domain>(
		displayName,
		createScale,
		propsToCheck,
	)
}
