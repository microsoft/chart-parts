// tslint:disable no-this-assignment
import {
	Mark,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
} from '@gog/mark-spec-interfaces'
import { MarkType } from '@gog/mark-interfaces'

export class MarkBuilder {
	private type: MarkType | undefined
	private table: string | undefined
	private role: string | undefined
	private name: string | undefined
	private zIndex: number | undefined
	private singleton: boolean = false
	private channels: Channels = {}
	private encodings: MarkEncodings = {}

	public setType(type: MarkType) {
		this.type = type
		return this
	}

	public setTable(table: string) {
		this.table = table
		return this
	}

	public setRole(role: string) {
		this.role = role
		return this
	}

	public setName(name: string) {
		this.name = name
		return this
	}

	public setZIndex(zIndex: number) {
		this.zIndex = zIndex
		return this
	}

	public setSingleton(value: boolean) {
		this.singleton = value
		return this
	}

	public addChannel(key: string, handler: ChannelHandler) {
		this.channels[key] = handler
		return this
	}

	public addEncoding(key: string, encoding: MarkEncoding) {
		this.encodings[key] = encoding
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
			zIndex,
			singleton,
		} = this
		if (!type) {
			throw new Error('mark type must be set')
		}
		if (!singleton && !table) {
			throw new Error('mark table must be set')
		}
		return {
			table,
			type,
			channels,
			encodings,
			role,
			name,
			zIndex,
			singleton,
		}
	}
}
