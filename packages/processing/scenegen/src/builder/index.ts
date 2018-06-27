import { SceneBuilder } from './SceneBuilder'
import { MarkBuilder } from './MarkBuilder'
import { MarkType } from '@gog/mark-interfaces'

export * from './MarkBuilder'
export * from './SceneBuilder'
export * from './SceneNodeBuilder'

/**
 * A factory function for creating a new scene
 */
export function scene() {
	return new SceneBuilder()
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
export function arc() {
	return mark(MarkType.Arc)
}
export function area() {
	return mark(MarkType.Area)
}
export function group() {
	return mark(MarkType.Group)
}
export function image() {
	return mark(MarkType.Image)
}
export function path() {
	return mark(MarkType.Path)
}
export function rect() {
	return mark(MarkType.Rect)
}
export function rule() {
	return mark(MarkType.Rule)
}
export function shape() {
	return mark(MarkType.Shape)
}
export function symbol() {
	return mark(MarkType.Symbol)
}
export function text() {
	return mark(MarkType.Text)
}
export function trail() {
	return mark(MarkType.Trail)
}
