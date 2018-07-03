import { CreateScaleArgs, Dimension } from '@gog/interfaces'

export function getBoundRange(
	args: CreateScaleArgs,
	rangeBind: Dimension,
): [number, number] {
	const {
		viewBounds: { x, y },
	} = args

	// If an origin is defined, this will use the origin in the scale calculatinos
	return rangeBind === Dimension.Height ? y : x
}
