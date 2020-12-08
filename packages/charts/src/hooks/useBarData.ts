/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { useMemo } from 'react'
import { Orientation, DataProp, ProcessedBarData } from '../types'

export function useBarData(
	data: DataProp[],
	orientationKey: Orientation,
): ProcessedBarData[] {
	return useMemo(() => {
		if (orientationKey === Orientation.vertical) {
			return data.map((d: any) => ({ ...d, _key: d.key, _value: d.value }))
		}
		return data.map((d: any) => ({
			...d,
			_key: d.value,
			_value: d.key,
			_orientation: orientationKey,
		}))
	}, [data, orientationKey]) as any
}
