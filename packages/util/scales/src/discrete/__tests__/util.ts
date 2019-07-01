import { ScaleCreationContext } from '@chart-parts/interfaces'

/**
 * Creates a scale context suitable for testing
 *
 * @param data The data table map
 */
export function createScaleContext(
	data: Record<string, Record<string, any>[]>,
): ScaleCreationContext {
	return {
		data,
		viewBounds: {
			x: [0, 100],
			y: [0, 100],
		},
		view: {} as any,
		scales: {},
	}
}
