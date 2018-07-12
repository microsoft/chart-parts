import { MarkType } from '@gog/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ArcProps extends CommonMarkProps {
	startAngle?: MarkEncodingProp
	endAngle?: MarkEncodingProp
	padAngle?: MarkEncodingProp
	innerRadius?: MarkEncodingProp
	outerRadius?: MarkEncodingProp
	cornerRadius?: MarkEncodingProp
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
