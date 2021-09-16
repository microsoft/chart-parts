/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps } from '../types'
import { createMarkComponent } from './BaseMark'

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
