import { CreateScaleArgs, Dimension } from '@gog/interfaces'

export function getBoundRange(
	args: CreateScaleArgs,
	rangeBind: Dimension,
): [number, number] {
	const {
		view: {
			shape: { width = 0, height = 0 },
			origin: { x = 0, y = 0 },
		},
	} = args

	// If an origin is defined, this will use the origin in the scale calculatinos
	if (rangeBind === Dimension.Height) {
		return [height + y, 0]
	} else {
		return [x, width]
	}
}
