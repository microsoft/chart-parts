import { Renderer } from '@gog/render-interfaces'
import { VDomRenderer } from '@gog/vdom-interfaces'
import { parseScene } from '@gog/scenegraph'
import { ChartOptions } from '@gog/prerender-interfaces'
import { VirtualSvgRenderer } from '@gog/prerender'

const virtualSvgRenderer = new VirtualSvgRenderer()

export class VirtualSvgPipeline<T> {
	constructor(private renderer: VDomRenderer<T>) {}

	public handle(rawScene: any, options: ChartOptions = {}) {
		// TODO: handle the case where the raw scene has already been parsed
		const scene = parseScene(rawScene)
		const vdom = virtualSvgRenderer.render(scene, options)
		return this.renderer.render(vdom)
	}
}
