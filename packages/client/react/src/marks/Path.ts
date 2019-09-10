/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export interface PathProps extends CommonMarkProps {
	path?: MarkEncodingProp<string>
}

export const Path = createMarkComponent<PathProps>(
	MarkType.Path,
	({ path }) => ({ path }),
)
