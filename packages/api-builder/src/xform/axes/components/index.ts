/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { AxisComponent } from '../interfaces'
import { Domain } from './domain'
import { TickLines } from './tickLines'
import { TickLabels } from './tickLabels'

/**
 * The axis component class instances
 * @ignore
 */
export const components: AxisComponent[] = [
	new Domain(),
	new TickLines(),
	new TickLabels(),
]
