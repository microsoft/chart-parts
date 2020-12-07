/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { useEffect } from 'react'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { MarkBuilder } from '@chart-parts/builder'
import {
	MarkType,
	MarkEncoding,
	MarkEncodingKey,
} from '@chart-parts/interfaces'

/**
 * Path Mark Component Props
 * @category Mark
 */
export interface PathProps extends CommonMarkProps {
	path?: MarkEncoding<string>
}

/**
 * Path Mark Component
 * @category Mark
 */
export const Path = createMarkComponent<PathProps>(
	MarkType.Path,
	(mark: MarkBuilder, props) => {
		useEffect(() => {
			mark.encode(MarkEncodingKey.path, props.path)
		}, [mark, props.path])
	},
)
