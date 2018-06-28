import { MarkType, MarkEncoding } from '@gog/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface AreaProps extends CommonMarkProps {
	orient?: MarkEncoding
	interpolate?: MarkEncoding
	tension?: MarkEncoding
	defined?: MarkEncoding
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
