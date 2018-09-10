import {
	MarkType,
	HorizontalAlignment,
	VerticalAlignment,
} from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface ImageProps extends CommonMarkProps {
	url?: MarkEncodingProp<string>
	aspect?: MarkEncodingProp<boolean>
	align?: MarkEncodingProp<HorizontalAlignment>
	baseline?: MarkEncodingProp<VerticalAlignment>
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
