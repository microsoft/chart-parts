import { MarkType, MarkEncoding } from '@gog/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface TrailProps extends CommonMarkProps {
	size?: MarkEncoding
	defined?: MarkEncoding
}

export class Trail extends BaseMark<TrailProps> {
	public markType = MarkType.Trail

	protected encodeCustomProperties() {
		const { size, defined } = this.props
		return { size, defined }
	}
}
