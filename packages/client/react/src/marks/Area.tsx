import { MarkType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface AreaProps extends CommonMarkProps {
	orient?: MarkEncodingProp
	interpolate?: MarkEncodingProp
	tension?: MarkEncodingProp
	defined?: MarkEncodingProp
}

export class Area extends BaseMark<AreaProps> {
	public markType = MarkType.Area

	protected encodeCustomProperties() {
		const { orient, interpolate, tension, defined } = this.props
		return {
			orient,
			interpolate,
			tension,
			defined,
		}
	}
}
