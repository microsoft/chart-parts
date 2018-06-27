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
