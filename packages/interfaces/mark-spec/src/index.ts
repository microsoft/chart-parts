import { MarkType } from '@gog/mark-interfaces'

/**
 * Each scene node binds data with a set of marks and scales
 */
export interface SceneNode {
	mark: Mark

	/**
	 * The scales defined under this scene node
	 */
	scales: NamedScaleCreator[]

	/**
	 * The children scene nodes
	 */
	children: SceneNode[]
}

/**
 * Specification for rendering a mark in a scene
 */
export interface Mark {
	/**
	 * The type of mark to render
	 */
	type: MarkType

	/**
	 * The name of the data-table to bind this mark to
	 */
	table?: string

	/**
	 * The encodings, which map data values into attribute values
	 */
	encodings: MarkEncodings

	/**
	 * The event channels of the mark to listen to
	 */
	channels: Channels

	/**
	 * The role of this mark
	 */
	role?: string

	/**
	 * A helpful name for this mark
	 */
	name?: string

	/**
	 * If true, this mark will have a single item instance unbound to data
	 */
	singleton?: boolean

	/**
	 * For group marks, an optional parameter on data faceting
	 */
	facet?: Facet
}

/**
 * Faceting configuration to apply on incoming data
 */
export interface Facet {
	/**
	 * The name of the facet-tables that dowstream marks will see
	 */
	name: string

	/**
	 * How incoming data will be split up.
	 *
	 * If the value is a string, then it indicates the name of a key proprtey that the rows will be partitioned
	 * on.
	 * If the value is a function, then the function describes how to get a partition key for a row.
	 */
	partitionOn: ((row: any) => any)
}

/**
 * An encoding specification for a mark property. This can either be a static
 * primitive or a function that generates the value
 */
export type MarkEncodingFunction = (
	args: MarkEncodingFunctionArgs,
) => number | string | boolean

export type MarkEncoding = number | string | boolean | MarkEncodingFunction

/**
 * The arguments used for mark encoding functions
 */
export interface MarkEncodingFunctionArgs {
	/**
	 * The current row of the data to encode.
	 */
	row: any

	/**
	 * The index of the current Row
	 */
	rowIndex: number

	/**
	 * The configured scales, which may be used to transform row data
	 */
	scales: Scales

	/**
	 * The bound dataset
	 */
	data: any[]

	/**
	 * The full dataset
	 */
	tables: { [key: string]: any[] }
}

/**
 * When they appear in the scale map config, a scale is just a function that can
 * trasform a source domain to a target domain, where each domain can be of any
 * primitive type
 */
export interface Scales {
	[key: string]: Scale<any, any>
}

/**
 * A hash of mark encodings by property name
 */
export interface MarkEncodings {
	[key: string]: MarkEncoding
}

export type ChannelHandler = (arg: any) => void

/**
 * A hash of mark event channels by event name
 */
export interface Channels {
	[key: string]: ChannelHandler
}

/**
 * An hash of scale-name to scale-creator functions
 */
export interface NamedScaleCreator {
	/**
	 * The name of the scale
	 */
	name: string

	/**
	 * The table this scale is applied to when computing domain
	 */
	table: string

	/**
	 * The creator function for this scale
	 */
	creator: ScaleCreator
}

/**
 * A factory function that creates a scale instance.
 */
export type ScaleCreator = (input: CreateScaleArgs) => Scale<any, any>

/**
 * Interface for the scale creation argument object, which is used to
 * create scale instances when a chart drawn or resized.
 */
export interface CreateScaleArgs {
	/**
	 * The rectangle of the entire charting area
	 */
	chartRect: ViewRect

	/**
	 * The rectangle of the area that marks will be drawn in,
	 * This is (chartRect - space reserved for axes)
	 */
	drawRect: ViewRect

	/**
	 * The current set of configured scales
	 */
	scales: Scales

	/**
	 * The dataset to bind with
	 */
	data: any[]
}

/**
 *  Basic interface for a scale, this type does not include some exotic
 * methods that may exist on specific d3-scales.
 */
export type Scale<In, Out> = (input?: In) => Out

/**
 * A view rectangle in the SVG, using SVG Coordinates
 */
export interface ViewRect {
	top: number
	left: number
	bottom: number
	right: number
}
