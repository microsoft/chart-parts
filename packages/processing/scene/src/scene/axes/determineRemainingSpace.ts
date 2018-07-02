import { ViewSize, AxisOrientation } from '@gog/interfaces'

const dim = (value: number) => Math.max(value, 0)

export function determineRemainingSpace(
	view: ViewSize,
	spaces: Array<{ thickness: number; orient: AxisOrientation }>,
) {
	return spaces.reduce(
		(prev, { thickness, orient }) => {
			const isLeft = orient === AxisOrientation.Left
			const isTop = orient === AxisOrientation.Top
			const isVertical = isLeft || orient === AxisOrientation.Right
			const isHorizontal = !isVertical
			const {
				origin: { x, y },
				shape: { width, height },
			} = prev

			return {
				origin: {
					x: isLeft ? x + thickness : x,
					y: isTop ? y + thickness : y,
				},
				shape: {
					width: isVertical ? dim(width - thickness) : width,
					height: isHorizontal ? dim(height - thickness) : height,
				},
			}
		},
		{
			origin: {
				x: 0,
				y: 0,
			},
			shape: {
				width: view.width,
				height: view.height,
			},
		},
	)
}
