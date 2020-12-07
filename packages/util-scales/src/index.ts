/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import {
	LinearScale,
	LogScale,
	PowScale,
	SequantialScale,
	SqrtScale,
	TimeScale,
	UtcScale,
} from './quantitative'
import { BandScale, OrdinalScale, PointScale } from './discrete'
import { QuantizeScale } from './QuantizeScale'
import { QuantileScale } from './QuantileScale'

export * from './quantitative'
export * from './discrete'
export * from './QuantizeScale'
export * from './QuantileScale'
export { CategoricalColorScheme } from './colorSchemeMap'

// Quantitative Scale Factories
export const linear = (name: string) => new LinearScale().name(name)
export const log = (name: string) => new LogScale().name(name)
export const pow = (name: string) => new PowScale().name(name)
export const sequential = (name: string) => new SequantialScale().name(name)
export const sqrt = (name: string) => new SqrtScale().name(name)
export const time = (name: string) => new TimeScale().name(name)
export const utc = (name: string) => new UtcScale().name(name)

// Discrete Scale Factories
export const band = (name: string, bandwidth?: string) =>
	new BandScale().name(name).bandwidthName(bandwidth)
export const ordinal = (name: string) => new OrdinalScale().name(name)
export const point = (name: string, step?: string) =>
	new PointScale().name(name).stepName(step)

// Other
export const quantize = (name: string) => new QuantizeScale().name(name)
export const quantile = (name: string) => new QuantileScale().name(name)
