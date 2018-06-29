import {
	MarkType,
	DEFAULT_HEIGHT,
	DEFAULT_WIDTH,
	AxisOrientation,
} from '@gog/interfaces'
import { MarkBuilder } from './MarkBuilder'
import { SceneNodeBuilder } from './SceneNodeBuilder'
import { AxisBuilder } from './AxisBuilder'

export * from './MarkBuilder'
export * from './SceneNodeBuilder'

/**
 * A factory function for creating a new scene
 */
export function scene(
	cb: (child: SceneNodeBuilder) => SceneNodeBuilder,
	dimensions: { width: number; height: number },
	origin: [number, number] = [0, 0],
): SceneNodeBuilder {
	return new SceneNodeBuilder().mark(
		group('root')
			.role('frame')
			.zIndex(0)
			.singleton(true)
			.encode({
				x: () => origin[0],
				y: () => origin[1],
				width: () => dimensions.width || DEFAULT_WIDTH,
				height: () => dimensions.height || DEFAULT_HEIGHT,
			})
			.child(cb),
	)
}

/**
 * A factory function for creating a new mark
 * @param type The mark type to create
 */
export function mark(type: MarkType) {
	return new MarkBuilder().type(type)
}

//
// Utility functions for creating typed marks
//
export function arc(name?: string) {
	return mark(MarkType.Arc).name(name)
}
export function area(name?: string) {
	return mark(MarkType.Area).name(name)
}
export function group(name?: string) {
	return mark(MarkType.Group).name(name)
}
export function image(name?: string) {
	return mark(MarkType.Image).name(name)
}
export function path(name?: string) {
	return mark(MarkType.Path).name(name)
}
export function rect(name?: string) {
	return mark(MarkType.Rect).name(name)
}
export function rule(name?: string) {
	return mark(MarkType.Rule).name(name)
}
export function shape(name?: string) {
	return mark(MarkType.Shape).name(name)
}
export function symbol(name?: string) {
	return mark(MarkType.Symbol).name(name)
}
export function text(name?: string) {
	return mark(MarkType.Text).name(name)
}
export function trail(name?: string) {
	return mark(MarkType.Trail).name(name)
}

/**
 * Creates a new Axis builder
 * @param scale The name of the scale to align the axis with
 * @param orientation The positioning of the axis in the view-space
 */
export function axis(scale: string, orientation: AxisOrientation): AxisBuilder {
	return new AxisBuilder().scale(scale).orient(orientation)
}
