/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps } from '../interfaces'
import { createMarkComponent } from './BaseMark'

export type RuleProps = CommonMarkProps

export const Rule = createMarkComponent<RuleProps>(MarkType.Rule)
