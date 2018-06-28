// tslint:disable no-this-assignment
import {
	MarkSpec,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
	Facet,
	MarkType,
} from '@gog/interfaces'
import { SceneNodeBuilder } from './SceneNodeBuilder'

export class MarkBuilder {
	private childNode: SceneNodeBuilder | undefined
	private typeVal: MarkType | undefined
	private tableVal: string | undefined
	private roleVal: string | undefined
	private nameVal: string | undefined
	private facetVal: Facet | undefined
	private singletonVal: boolean = false
	private channelsVal: Channels = {}
	private encodingsVal: MarkEncodings = {}

	public type(type: MarkType): MarkBuilder {
		this.typeVal = type
		return this
	}

	public table(table: string | undefined): MarkBuilder {
		this.tableVal = table
		return this
	}

	public role(role: string | undefined): MarkBuilder {
		this.roleVal = role
		return this
	}

	public name(name: string | undefined): MarkBuilder {
		this.nameVal = name
		return this
	}

	public zIndex(zIndex: number | undefined): MarkBuilder {
		if (zIndex !== undefined) {
			this.encode('zIndex', () => zIndex)
		} else {
			delete this.encodingsVal.zIndex
		}

		return this
	}

	public singleton(value: boolean | undefined): MarkBuilder {
		this.singletonVal = !!value
		return this
	}

	public handle(name: string, handler: ChannelHandler): MarkBuilder
	public handle(channels: Channels): MarkBuilder
	public handle(
		name: string | Channels,
		handler?: ChannelHandler,
	): MarkBuilder {
		if (typeof name === 'string') {
			if (!handler) {
				throw new Error(`handler function must be defined for handler ${name}`)
			}
			this.channelsVal[name] = handler
		} else {
			const channels = name as Channels
			Object.entries(channels).forEach(
				([nameVal, handlerVal]) => (this.channelsVal[nameVal] = handlerVal),
			)
		}

		return this
	}

	public encode(key: string, encoding: MarkEncoding): MarkBuilder
	public encode(encodings: MarkEncodings): MarkBuilder

	// Polymorphic function definition
	public encode(
		first: string | MarkEncodings,
		encoding?: MarkEncoding,
	): MarkBuilder {
		if (typeof first === 'string') {
			// Handle encode(key, encoding) invocations
			const key: string = first
			if (!encoding) {
				throw new Error(`encoding must be defined for key ${key}`)
			}
			this.encodingsVal[key] = encoding
		} else {
			// Handle encode(map) invocations
			const encodings = first as MarkEncodings
			Object.entries(encodings).forEach(
				([name, entryEncoding]) => (this.encodingsVal[name] = entryEncoding),
			)
			return this
		}
		return this
	}

	public facet(facet: Facet | undefined): MarkBuilder {
		this.facetVal = facet
		return this
	}

	/**
	 * Pushes a new scene node onto the graph
	 */
	public child(callback: (b: SceneNodeBuilder) => void): MarkBuilder {
		this.childNode = new SceneNodeBuilder()
		callback(this.childNode)
		return this
	}

	public build(): MarkSpec {
		const {
			typeVal: type,
			tableVal: table,
			channelsVal: channels,
			encodingsVal: encodings,
			roleVal: role,
			nameVal: name,
			singletonVal: singleton,
			facetVal: facet,
			childNode,
		} = this

		if (!type) {
			throw new Error('mark type must be set')
		}
		if (!singleton && !table) {
			throw new Error('mark table must be set or the mark must be a singleton')
		}
		if (this.facetVal && this.typeVal !== MarkType.Group) {
			throw new Error('faceting can only be applied to group type marks')
		}

		return {
			table,
			type,
			channels,
			encodings,
			role,
			name,
			singleton,
			facet,
			child: childNode && childNode.build(),
		}
	}
}
