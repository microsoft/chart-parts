/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import {
	Mark,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
	Facet,
	MarkType,
	ItemIdGenerator,
} from '@chart-parts/interfaces'
import { SceneNodeSpec } from './SceneNodeSpec'

/**
 * Mark Specification Object
 * @category Specification
 */
export class MarkSpec implements Mark {
	private _table: string | undefined
	private _channels: Channels = {}
	private _encodings: MarkEncodings = {}
	private _role?: string
	private _name?: string
	private _child?: SceneNodeSpec
	private _facet?: Facet
	private _idGenerator?: ItemIdGenerator

	public constructor(public readonly type: MarkType) {}

	public get child() {
		return this._child
	}

	public set child(value: SceneNodeSpec | undefined) {
		this._child = value
	}

	public get table(): string | undefined {
		return this._table
	}

	public set table(value: string | undefined) {
		this._table = value
	}

	public get name(): string | undefined {
		return this._name
	}

	public set name(value: string | undefined) {
		this._name = value
	}

	public get role() {
		return this._role
	}

	public set role(value: string | undefined) {
		this._role = value
	}

	public get idGenerator(): ItemIdGenerator | undefined {
		return this._idGenerator
	}

	public set idGenerator(value: ItemIdGenerator | undefined) {
		this._idGenerator = value
	}

	public get facet(): Facet | undefined {
		return this._facet
	}

	public set facet(value: Facet | undefined) {
		this._facet = value
	}

	public get encodings(): MarkEncodings {
		return this._encodings
	}

	public get channels(): Channels {
		return this._channels
	}

	public applyHandler(key: string, handler: ChannelHandler<any> | undefined) {
		if (handler != null) {
			this._channels[key] = handler
		} else {
			delete this._channels[key]
		}
	}

	public applyEncoding<T>(key: string, encoding: undefined | MarkEncoding<T>) {
		if (encoding != null) {
			this._encodings[key] = encoding
		} else {
			delete this._encodings[key]
		}
	}
}
