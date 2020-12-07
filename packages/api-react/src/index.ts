/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { ChartRendererContext } from './Context'
export * from './Chart'
export * from './Axis'
export * from './types'
export * from './scales'
export * from './marks'

/**
 * A function that provides the charting renderer implementation
 * to use across the application.
 * @category Chart
 */
export const ChartingProvider = ChartRendererContext.Provider
export { Dimension } from '@chart-parts/interfaces'
export { CategoricalColorScheme } from '@chart-parts/scales'
