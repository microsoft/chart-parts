import { MarkType, MarkEncoding } from '@gog/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ArcProps extends CommonMarkProps {
	startAngle?: MarkEncoding
	endAngle?: MarkEncoding
	padAngle?: MarkEncoding
	innerRadius?: MarkEncoding
	outerRadius?: MarkEncoding
	cornerRadius?: MarkEncoding
}

export class Arc extends BaseMark<ArcProps> {
	public markType = MarkType.Arc

	protected encodeCustomProperties() {
		const {
			startAngle,
			endAngle,
			padAngle,
			innerRadius,
			outerRadius,
			cornerRadius,
		} = this.props
		return {
			startAngle,
			endAngle,
			padAngle,
			innerRadius,
			outerRadius,
			cornerRadius,
		}
	}
}
