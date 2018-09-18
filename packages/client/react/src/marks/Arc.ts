import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ArcProps extends CommonMarkProps {
	startAngle?: MarkEncodingProp<number>
	endAngle?: MarkEncodingProp<number>
	padAngle?: MarkEncodingProp<number>
	innerRadius?: MarkEncodingProp<number>
	outerRadius?: MarkEncodingProp<number>
	cornerRadius?: MarkEncodingProp<number>
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
