import { ScaleCreationContext, Dimension } from '@chart-parts/interfaces'

export function getBoundRange(
	args: ScaleCreationContext,
	rangeBind: Dimension,
): [number, number] {
	const {
		viewBounds: { x, y },
	} = args

	// If an origin is defined, this will use the origin in the scale calculatinos
	return rangeBind === Dimension.Height ? y : x
}
