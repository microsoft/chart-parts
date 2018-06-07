import { VDomRenderer } from '@gog/vdom-interfaces'
import { parseScene } from '@gog/scenegraph'
import { ChartOptions } from '@gog/xform-sg-interfaces'
import { VirtualSvgConverter } from '@gog/xform-vsvg'
import { SceneSpec } from '@gog/mark-spec-interfaces'
import { SceneGenerator } from '@gog/scenegen'

const converter = new VirtualSvgConverter()

export class VirtualSvgPipeline<T> {
	private generator = new SceneGenerator()

	constructor(private renderer: VDomRenderer<T>) {}

	public handleScenegraph(rawScene: any, options: ChartOptions = {}): T {
		const scene = parseScene(rawScene)
		const vdom = converter.render(scene, options)
		return this.renderer.render(vdom)
	}

	public handleData(
		data: any[],
		sceneSpec: SceneSpec,
		options: ChartOptions = {},
	) {
		const scene = this.generator.generateScene(data, sceneSpec, options)
		const vdom = converter.render(scene, options)
		return this.renderer.render(vdom)
	}
}
