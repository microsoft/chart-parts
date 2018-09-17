// tslint:disable no-this-assignment unified-signatures
import {
	Mark,
	Channels,
	ChannelHandler,
	MarkEncoding,
	MarkEncodings,
	MarkEncodingKey,
	Facet,
	Gradient,
	MarkType,
	StrokeCap,
	StrokeJoin,
	Orientation,
	Interpolation,
	HorizontalAlignment,
	VerticalAlignment,
	VerticalTextAlignment,
	SymbolType,
	FontWeight,
	TextDirection,
	ItemIdGenerator,
	Metadata,
} from '@markable/interfaces'
import { SceneNodeBuilder } from './SceneNodeBuilder'

export class MarkBuilder {
	private childNode?: SceneNodeBuilder
	private tableValue?: string
	private roleValue?: string
	private nameValue?: string
	private singletonValue?: boolean
	private facetValue?: Facet
	private itemIdGenerator?: ItemIdGenerator
	private channelsValue: Channels = {}
	private encodingsValue: MarkEncodings = {}
	private metadataValue?: MarkEncoding<Metadata>

	constructor(private type: MarkType) {}

	public table(table: string): MarkBuilder {
		this.tableValue = table
		return this
	}

	public singleton(value: boolean): MarkBuilder {
		this.singletonValue = value
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

	public idGenerator(generator: ItemIdGenerator): MarkBuilder {
		this.itemIdGenerator = generator
		return this
	}

	public metadata(value: MarkEncoding<Metadata>) {
		this.metadataValue = value
		return this
	}

	public zIndex(zIndex: number): MarkBuilder {
		if (zIndex !== undefined) {
			this.encode(MarkEncodingKey.zIndex, () => zIndex)
		} else {
			delete this.encodingsValue.zIndex
		}

		return this
	}

	public handle(name: string, handler: ChannelHandler<any>): MarkBuilder
	public handle(channels: Channels): MarkBuilder
	public handle(
		name: string | Channels,
		handler?: ChannelHandler<any>,
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

	// #region Mark Encoding
	public encode(
		key: MarkEncodingKey.x,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.x2,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.xc,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.width,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.y,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.y2,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.yc,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.height,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.opacity,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fill,
		encoding: MarkEncoding<string | Gradient>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fillOpacity,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.stroke,
		encoding: MarkEncoding<string | Gradient>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeOpacity,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeWidth,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeCap,
		encoding: MarkEncoding<StrokeCap>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeDash,
		encoding: MarkEncoding<[number, number]>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeDashOffset,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeJoin,
		encoding: MarkEncoding<StrokeJoin>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.strokeMiterLimit,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.cursor,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.href,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.tooltip,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.zIndex,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.startAngle,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.endAngle,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.padAngle,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.innerRadius,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.outerRadius,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.cornerRadius,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.orient,
		encoding: MarkEncoding<Orientation>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.interpolate,
		encoding: MarkEncoding<Interpolation>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.tension,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.defined,
		encoding: MarkEncoding<boolean>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.clip,
		encoding: MarkEncoding<boolean>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.url,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.aspect,
		encoding: MarkEncoding<boolean>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.align,
		encoding: MarkEncoding<HorizontalAlignment>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.baseline,
		encoding: MarkEncoding<VerticalAlignment | VerticalTextAlignment>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.path,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.size,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.shape,
		encoding: MarkEncoding<SymbolType | string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.angle,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.dir,
		encoding: MarkEncoding<TextDirection>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.dx,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.dy,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.ellipsis,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.font,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontSize,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontWeight,
		encoding: MarkEncoding<FontWeight>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontVariant,
		encoding: MarkEncoding<string | number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.fontStyle,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.limit,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.radius,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.text,
		encoding: MarkEncoding<string>,
	): MarkBuilder
	public encode(
		key: MarkEncodingKey.theta,
		encoding: MarkEncoding<number>,
	): MarkBuilder
	public encode(key: MarkEncodingKey, encoding: MarkEncoding<any>): MarkBuilder
	public encode(encodings: MarkEncodings): MarkBuilder

	// #endregion

	// Polymorphic function definition
	public encode(
		first: MarkEncodingKey | MarkEncodings,
		encoding?: MarkEncoding<any>,
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
			throw new Error('faceting can only be applied to "group" type marks')
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
			facetValue: facet,
			singletonValue: singleton,
			childNode,
			itemIdGenerator: idGenerator,
			metadataValue: metadata,
		} = this

		if (!type) {
			throw new Error('mark type must be set')
		}

		return {
			table,
			type,
			channels,
			encodings,
			role,
			name,
			facet,
			singleton,
			idGenerator,
			metadata,
			child: childNode && childNode.build(),
		}
	}
}
