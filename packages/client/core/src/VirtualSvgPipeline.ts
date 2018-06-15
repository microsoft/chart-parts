import { VDomRenderer } from '@gog/vdom-interfaces'
import { parseScene } from '@gog/scenegraph'
import { ChartOptions } from '@gog/xform-sg-interfaces'
import { VirtualSvgConverter } from '@gog/xform-vsvg'
import { Scene } from '@gog/mark-spec-interfaces'
import { SceneGenerator } from '@gog/scenegen'

const converter = new VirtualSvgConverter()

export class VirtualSvgPipeline<T> {
	private generator = new SceneGenerator()

	constructor(private renderer: VDomRenderer<T>) {}

	public handleScenegraph(rawScene: any, options: ChartOptions = {}): T {
		const scenegraph = parseScene(rawScene)
		const vdom = converter.render(scenegraph, options)
		return this.renderer.render(vdom, {})
	}

	public handleData(
		scene: Scene,
		options: ChartOptions = {},
		tables: { [key: string]: any[] },
	) {
		const sg = this.generator.generateScene(scene, options, tables)
		const vdom = converter.render(sg.root, options)
		return this.renderer.render(vdom, sg.channelHandlers)
	}
}
