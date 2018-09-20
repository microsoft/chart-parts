import { MarkType } from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface PathProps extends CommonMarkProps {
	path?: MarkEncodingProp<string>
}

export class Path extends BaseMark<PathProps> {
	public markType = MarkType.Path

	protected encodeCustomProperties() {
		const { path } = this.props
		return { path }
	}
}
