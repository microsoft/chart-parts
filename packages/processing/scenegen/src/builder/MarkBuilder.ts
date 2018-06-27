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
	private typeVal: MarkType | undefined
	private tableVal: string | undefined
	private roleVal: string | undefined
	private nameVal: string | undefined
	private facetVal: Facet | undefined
	private singletonVal: boolean = false
	private channelsVal: Channels = {}
	private encodingsVal: MarkEncodings = {}

	public type(type: MarkType) {
		this.typeVal = type
		return this
	}

	public table(table: string | undefined) {
		this.tableVal = table
		return this
	}

	public role(role: string | undefined) {
		this.roleVal = role
		return this
	}

	public name(name: string | undefined) {
		this.nameVal = name
		return this
	}

	public zIndex(zIndex: number | undefined) {
		if (zIndex !== undefined) {
			this.encode('zIndex', () => zIndex)
		} else {
			delete this.encodingsVal.zIndex
		}

		return this
	}

	public singleton(value: boolean | undefined) {
		this.singletonVal = !!value
		return this
	}

	public channel(name: string, handler: ChannelHandler) {
		this.channelsVal[name] = handler
		return this
	}

	public channels(channels: Channels) {
		Object.entries(channels).forEach(([name, handler]) =>
			this.channel(name, handler),
		)
		return this
	}

	public encode(key: string, encoding: MarkEncoding) {
		this.encodingsVal[key] = encoding
		return this
	}

	public encodings(encodings: MarkEncodings) {
		Object.entries(encodings).forEach(
			([name, encoding]) => (this.encodingsVal[name] = encoding),
		)
		return this
	}

	public facet(facet: Facet | undefined) {
		this.facetVal = facet
		return this
	}

	public build(): Mark {
		const {
			typeVal: type,
			tableVal: table,
			channelsVal: channels,
			encodingsVal: encodings,
			roleVal: role,
			nameVal: name,
			singletonVal: singleton,
			facetVal: facet,
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
		}
	}
}
