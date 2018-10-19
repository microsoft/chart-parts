/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Path, path } from 'd3-path'
import { tau } from './constants'

export function drawCircle(context: Path, radius: number) {
	if (!context) {
		context = path()
	}

	context.moveTo(radius, 0)
	context.arc(0, 0, radius, 0, tau)
	return context
}
