/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { format } from 'd3-format'
import { timeFormat } from 'd3-time-format'
import { AxisContext } from '../../interfaces'
import { Scale } from '@chart-parts/interfaces'

function isTimeScale(scale: Scale<any, any>) {
	return scale.__scaletype__ === 'utc' || scale.__scaletype__ === 'time'
}

/**
 * @ignore
 */
export function getLabelFormatter(
	context: AxisContext,
): (input: any) => string {
	const scale = context.scale
	const { labelFormat } = context.axis

	if (!labelFormat) {
		return (t: any) => `${t}`
	}

	return isTimeScale(scale) ? timeFormat(labelFormat) : format(labelFormat)
}
