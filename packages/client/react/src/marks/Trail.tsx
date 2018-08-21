import { MarkType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface TrailProps extends CommonMarkProps {
	size?: MarkEncodingProp
	defined?: MarkEncodingProp
}

export class Trail extends BaseMark<TrailProps> {
	public markType = MarkType.Trail

	protected encodeCustomProperties() {
		const { size, defined } = this.props
		return { size, defined }
	}
}
