/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'
import { MarkType } from '@chart-parts/interfaces'

/**
 * Rule Mark Component Props
 * @category Mark
 */
export type RuleProps = CommonMarkProps

/**
 * Rule Mark Component
 * @category Mark
 */
export const Rule = createMarkComponent<RuleProps>(MarkType.Rule)
