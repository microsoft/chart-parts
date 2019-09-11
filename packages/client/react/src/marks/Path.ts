/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	MarkType,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'
import { CommonMarkProps } from '../interfaces'
import { createMarkComponent } from './BaseMark'
import { MarkBuilder } from '@chart-parts/builder'
import { useEffect } from 'react'

export interface PathProps extends CommonMarkProps {
	path?: MarkEncoding<string>
}

export const Path = createMarkComponent<PathProps>(
	MarkType.Path,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.path, props.path)
		}, [mark, props.path])
	},
)
