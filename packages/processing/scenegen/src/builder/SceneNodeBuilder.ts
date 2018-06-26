// tslint:disable no-this-assignment
import {
	SceneNode,
	ScaleCreator,
	ChannelHandler,
	MarkEncoding,
	NamedScaleCreator,
	Channels,
	MarkEncodings,
	Facet,
} from '@gog/mark-spec-interfaces'
import { MarkBuilder } from './MarkBuilder'
import { MarkType } from '@gog/mark-interfaces'

export class SceneNodeBuilder {
	/**
	 * The mark for this node
	 */
	private markBuilder: MarkBuilder = new MarkBuilder()

	/**
	 * The scales defined for children of this node
	 */
	private scales: NamedScaleCreator[] = []

	/**
	 * The child scene
	 */
	private children: SceneNodeBuilder[] = []

	/**
	 * Adds a scale-creator to the scene configuration
	 * @param name The name of the scale-creator to add
	 * @param table The name of the bound datatable to use
	 * @param creator The scale-creator
	 */
	public addScale(name: string, table: string, creator: ScaleCreator) {
		this.scales.push({ name, creator, table })
		return this
	}

	public addChannel(key: string, handler: ChannelHandler) {
		this.markBuilder.addChannel(key, handler)
		return this
	}

	public addChannels(channels: Channels) {
		this.markBuilder.addChannels(channels)
		return this
	}

	public addEncoding(key: string, encoding: MarkEncoding) {
		this.markBuilder.addEncoding(key, encoding)
		return this
	}

	public addEncodings(encodings: MarkEncodings) {
		this.markBuilder.addEncodings(encodings)
		return this
	}

	public setType(type: MarkType) {
		this.markBuilder.setType(type)
		return this
	}

	public setTable(table: string | undefined) {
		this.markBuilder.setTable(table)
		return this
	}

	public setRole(role: string | undefined) {
		this.markBuilder.setRole(role)
		return this
	}

	public setName(name: string | undefined) {
		this.markBuilder.setName(name)
		return this
	}

	public setZIndex(zIndex: number | undefined) {
		this.markBuilder.setZIndex(zIndex)
		return this
	}

	public setFacet(facet: Facet | undefined) {
		this.markBuilder.setFacet(facet)
		return this
	}

	public setSingleton(value: boolean | undefined) {
		this.markBuilder.setSingleton(value)
		return this
	}

	/**
	 * Pushes a new scene node onto the graph
	 */
	public push() {
		const newNode = new SceneNodeBuilder()
		this.children.push(newNode)
		return newNode
	}

	/**
	 * Builds the scene object
	 */
	public build(): SceneNode {
		const { scales, markBuilder, children: builderChildren } = this
		const mark = markBuilder.build()
		const children = builderChildren.map(c => c.build())
		if (children.length > 0 && mark.type !== MarkType.Group) {
			throw new Error('only group marks may have children')
		}
		return { mark, scales, children }
	}
}
