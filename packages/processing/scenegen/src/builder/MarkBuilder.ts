// tslint:disable no-this-assignment
import {
	Mark,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
	Facet,
} from '@gog/mark-spec-interfaces'
import { MarkType } from '@gog/mark-interfaces'

export class MarkBuilder {
	private type: MarkType | undefined
	private table: string | undefined
	private role: string | undefined
	private name: string | undefined
	private facet: Facet | undefined
	private singleton: boolean = false
	private channels: Channels = {}
	private encodings: MarkEncodings = {}

	public setType(type: MarkType) {
		this.type = type
		return this
	}

	public setTable(table: string | undefined) {
		this.table = table
		return this
	}

	public setRole(role: string | undefined) {
		this.role = role
		return this
	}

	public setName(name: string | undefined) {
		this.name = name
		return this
	}

	public setZIndex(zIndex: number | undefined) {
		if (zIndex !== undefined) {
			this.addEncoding('zIndex', zIndex)
		} else {
			delete this.encodings.zIndex
		}

		return this
	}

	public setSingleton(value: boolean | undefined) {
		this.singleton = !!value
		return this
	}

	public addChannel(key: string, handler: ChannelHandler) {
		this.channels[key] = handler
		return this
	}

	public addChannels(channels: Channels) {
		Object.entries(channels).forEach(
			([name, handler]) => (this.channels[name] = handler),
		)
		return this
	}

	public addEncoding(key: string, encoding: MarkEncoding) {
		this.encodings[key] = encoding
		return this
	}

	public addEncodings(encodings: MarkEncodings) {
		Object.entries(encodings).forEach(
			([name, encoding]) => (this.encodings[name] = encoding),
		)
		return this
	}

	public setFacet(facet: Facet | undefined) {
		this.facet = facet
		return this
	}

	public build(): Mark {
		const {
			type,
			table,
			channels,
			encodings,
			role,
			name,
			singleton,
			facet,
		} = this
		if (!type) {
			throw new Error('mark type must be set')
		}
		if (!singleton && !table) {
			throw new Error('mark table must be set or the mark must be a singleton')
		}
		if (this.facet && this.type !== MarkType.Group) {
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
		}
	}
}
