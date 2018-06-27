import { VDomRenderer } from '@gog/vdom-interfaces'
import { parseScene } from '@gog/scenegraph'
import { ChartOptions } from '@gog/xform-sg-interfaces'
import { VirtualSvgConverter } from '@gog/xform-vsvg'
import { SceneNode, DataFrame } from '@gog/mark-spec-interfaces'
import { Scene } from '@gog/scenegen'

const converter = new VirtualSvgConverter()

export class VirtualSvgPipeline<T> {
	constructor(private renderer: VDomRenderer<T>) {}

	public handleScenegraph(rawScene: any, options: ChartOptions = {}): T {
		const scenegraph = parseScene(rawScene)
		const vdom = converter.render(scenegraph, options)
		return this.renderer.render(vdom, {})
	}

	public handleData(
		scene: SceneNode,
		options: ChartOptions = {},
		tables: DataFrame,
	) {
		const sg = new Scene(scene, options).build(tables)
		const vdom = converter.render(sg.root, options)
		return this.renderer.render(vdom, sg.channelHandlers)
	}
}
