import { MarkType } from '@gog/mark-interfaces'

export type Transformer<In, Out> = (input?: In) => Out

export interface ViewRect {
	top: number
	left: number
	bottom: number
	right: number
}

export interface ScaleCreatorArgs<Datum> {
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
	 * The data to evaluate when creating the scale
	 */
	data: Datum[]

	/**
	 * The current set of configured scales
	 */
	scales: ScaleHash
}

export type ScaleCreator<Datum> = (
	input: ScaleCreatorArgs<Datum>,
) => Transformer<any, any>

export interface NamedScaleCreator {
	name: string
	scaleCreator: ScaleCreator<any>
}

/**
 * When they appear in the scale map config, a scale is just a function that can
 * trasform a source domain to a target domain, where each domain can be of any
 * primitive type
 */
export interface ScaleHash {
	[key: string]: Transformer<any, any>
}

export interface MarkEncodingFunctionArgs {
	/**
	 * The data row
	 */
	row: any

	/**
	 * The configured scales
	 */
	scales: ScaleHash
}

export type MarkEncoding =
	| number
	| string
	| ((arg: MarkEncodingFunctionArgs) => any)

export interface MarkEncodings {
	[key: string]: MarkEncoding
}

export interface MarkSpec {
	type: MarkType
	encodings: MarkEncodings
}

export interface SceneSpec {
	marks: MarkSpec[]
	scales: NamedScaleCreator[]
}
