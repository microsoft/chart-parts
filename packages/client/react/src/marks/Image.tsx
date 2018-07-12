import { MarkType } from '@gog/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ImageProps extends CommonMarkProps {
	url?: MarkEncodingProp
	aspect?: MarkEncodingProp
	align?: MarkEncodingProp
	baseline?: MarkEncodingProp
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
