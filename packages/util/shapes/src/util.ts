/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

export type Xform<T, K> = (d: T, index?: number, data?: T[]) => K
