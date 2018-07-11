// tslint:disable no-this-assignment
import {
	Mark,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
	Facet,
	MarkType,
} from '@gog/interfaces'
import { SceneNodeBuilder } from './SceneNodeBuilder'

export class MarkBuilder {
	private childNode?: SceneNodeBuilder
	private singletonValue: boolean = false
	private tableValue?: string
	private roleValue?: string
	private nameValue?: string
	private facetValue?: Facet
	private channelsValue: Channels = {}
	private encodingsValue: MarkEncodings = {}

	constructor(private type: MarkType) {}

	public table(table: string): MarkBuilder {
		this.tableValue = table
		return this
	}

	public role(role: string): MarkBuilder {
		this.roleValue = role
		return this
	}

	public name(name: string): MarkBuilder {
		this.nameValue = name
		return this
	}

	public zIndex(zIndex: number): MarkBuilder {
		if (zIndex !== undefined) {
			this.encode('zIndex', () => zIndex)
		} else {
			delete this.encodingsValue.zIndex
		}

		return this
	}

	public singleton(value?: boolean): MarkBuilder {
		this.singletonValue = value === undefined ? true : value
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
			this.channelsValue[name] = handler
		} else {
			const channels = name as Channels
			Object.entries(channels).forEach(
				([nameVal, handlerVal]) => (this.channelsValue[nameVal] = handlerVal),
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
			this.encodingsValue[key] = encoding
		} else {
			// Handle encode(map) invocations
			const encodings = first as MarkEncodings
			Object.entries(encodings).forEach(
				([name, entryEncoding]) => (this.encodingsValue[name] = entryEncoding),
			)
			return this
		}
		return this
	}

	public facet(facet: Facet): MarkBuilder {
		if (facet !== undefined && this.type !== MarkType.Group) {
			throw new Error('faceting can only be applied to group type marks')
		}
		this.facetValue = facet
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

	public build(): Mark {
		const {
			type,
			tableValue: table,
			channelsValue: channels,
			encodingsValue: encodings,
			roleValue: role,
			nameValue: name,
			singletonValue: singleton,
			facetValue: facet,
			childNode,
		} = this

		if (!type) {
			throw new Error('mark type must be set')
		}
		if (!singleton && !table) {
			throw new Error('mark table must be set or the mark must be a singleton')
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
