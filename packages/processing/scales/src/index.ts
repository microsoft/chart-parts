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

export * from './quantitative'
export * from './discrete'
export { CategoricalColorScheme } from './colorSchemeMap'

// Quantitative Scale Factories
export const linear = () => new LinearScale()
export const log = () => new LogScale()
export const pow = () => new PowScale()
export const sequential = () => new SequantialScale()
export const sqrt = () => new SqrtScale()
export const time = () => new TimeScale()
export const utc = () => new UtcScale()

// Discrete Scale Factories
export const band = () => new BandScale()
export const ordinal = () => new OrdinalScale()
export const point = () => new PointScale()
