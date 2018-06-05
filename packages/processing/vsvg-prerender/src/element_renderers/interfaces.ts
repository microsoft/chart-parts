import { VSvgNode } from '@gog/vdom-interfaces'
import { MarkPrerenderer } from '@gog/prerender-interfaces'

export interface VSvgMarkOutput {
	nodes: VSvgNode[]
	defs?: VSvgNode[]
}

export interface VSvgRenderContext {
	nextId(): string
}

export type VSvgMarkPrerenderer = MarkPrerenderer<
	VSvgMarkOutput,
	VSvgRenderContext
>
