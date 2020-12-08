/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { Orientation } from '../types'

export function useChartOrientation(
	orientation: Orientation | undefined,
): Orientation {
	return useMemo(() => {
		let result = Orientation.horizontal
		if (orientation && orientation in Orientation) {
			result = orientation
		}
		return result
	}, [orientation]) as any
}
