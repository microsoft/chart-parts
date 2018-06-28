import { MarkType, MarkEncoding } from '@gog/interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ImageProps extends CommonMarkProps {
	url?: MarkEncoding
	aspect?: MarkEncoding
	align?: MarkEncoding
	baseline?: MarkEncoding
}

export class Image extends BaseMark<ImageProps> {
	public markType = MarkType.Image

	protected encodeCustomProperties() {
		const { url, aspect, align, baseline } = this.props
		return {
			url,
			aspect,
			align,
			baseline,
		}
	}
}
