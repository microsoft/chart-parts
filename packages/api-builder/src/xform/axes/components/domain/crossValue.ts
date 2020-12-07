/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Axis, AxisOrientation } from '@chart-parts/interfaces'

/**
 * @ignore
 */
export function crossValue(axis: Axis, thickness: number): number {
	const domainWidth = axis.domainWidth as number
	const { orient } = axis

	let result = domainWidth
	switch (orient) {
		case AxisOrientation.Bottom: {
			result = domainWidth / 2
			break
		}
		case AxisOrientation.Left: {
			result = thickness - domainWidth / 2
			break
		}
		case AxisOrientation.Right: {
			result = domainWidth / 2
			break
		}
		case AxisOrientation.Top: {
			result = thickness + domainWidth / 2
			break
		}
	}
	return result
}
