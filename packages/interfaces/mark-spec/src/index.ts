import { MarkType } from '@gog/mark-interfaces'

/**
 * Each scene node binds data with a set of marks and scales
 */
export interface SceneNode {
	/**
	 * The scales defined at this scene node
	 */
	scales: ScaleCreator[]

	/**
	 * The marks defined at this scene-node. Scales defined in this node apply to these marks
	 */
	marks: Mark[]
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

	/**
	 * The child scene of this mark
	 */
	child?: SceneNode
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
	partitionOn: string | ((row: any) => any)
}

export interface MarkData {
	/**
	 * The current row of the data to encode.
	 */
	datum: any

	/**
	 * The index of the datum within the data collection
	 */
	index: number

	/**
	 * The bound dataset
	 */
	data: any[]

	/**
	 * The full dataset
	 */
	tables: DataFrame
}

export type MarkEncoding = (
	data: MarkData,
	scales: Scales,
) => number | string | boolean

export enum Dimension {
	HEIGHT = 'height',
	WIDTH = 'width',
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

export interface HandlerMetadata {
	/**
	 * The index of the item in it's respective bound dataset
	 */
	index: number

	/**
	 * Additional metadata keys attached to the item in the scenegraph
	 */
	[key: string]: any
}

export type ChannelHandler = (
	nativeEventArgument: any,
	metadata: HandlerMetadata,
) => void

/**
 * A hash of mark event channels by event name
 */
export interface Channels {
	[key: string]: ChannelHandler
}

/**
 * A factory function that creates a scale instance.
 */
export type ScaleCreator = (input: CreateScaleArgs) => Scales

/**
 * Interface for the scale creation argument object, which is used to
 * create scale instances when a chart drawn or resized.
 */
export interface CreateScaleArgs {
	/**
	 * The rectangle of the area that marks will be drawn in,
	 * This is (chartRect - space reserved for axes)
	 */
	view: ViewSize

	/**
	 * The current set of configured scales
	 */
	scales: Scales

	/**
	 * The dataset to bind with
	 */
	data: DataFrame
}

/**
 *  Basic interface for a scale, this type does not include some exotic
 * methods that may exist on specific d3-scales.
 */
export type Scale<In, Out> = (input?: In) => Out

/**
 * A view rectangle in the SVG, using SVG Coordinates
 */
export interface ViewSize {
	width: number
	height: number
}

export interface DataFrame {
	[key: string]: any[]
}

export interface ChannelNames {
	[key: string]: string
}
