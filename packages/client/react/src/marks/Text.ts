import {
	MarkType,
	HorizontalAlignment,
	VerticalTextAlignment,
	TextDirection,
	FontWeight,
} from '@chart-parts/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface TextProps extends CommonMarkProps {
	align?: MarkEncodingProp<HorizontalAlignment>
	angle?: MarkEncodingProp<number>
	baseline?: MarkEncodingProp<VerticalTextAlignment>
	dir?: MarkEncodingProp<TextDirection>
	dx?: MarkEncodingProp<number>
	dy?: MarkEncodingProp<number>
	ellipsis?: MarkEncodingProp<string>
	font?: MarkEncodingProp<string>
	fontSize?: MarkEncodingProp<number>
	fontWeight?: MarkEncodingProp<FontWeight>
	fontVariant?: MarkEncodingProp<string | number>
	fontStyle?: MarkEncodingProp<number>
	limit?: MarkEncodingProp<number>
	radius?: MarkEncodingProp<number>
	text?: MarkEncodingProp<string>
	theta?: MarkEncodingProp<number>
}

export class Text extends BaseMark<TextProps> {
	public markType = MarkType.Text

	protected encodeCustomProperties() {
		const {
			align,
			angle,
			baseline,
			dir,
			dx,
			dy,
			ellipsis,
			font,
			fontSize,
			fontWeight,
			fontVariant,
			fontStyle,
			limit,
			radius,
			text,
			theta,
		} = this.props
		return {
			align,
			angle,
			baseline,
			dir,
			dx,
			dy,
			ellipsis,
			font,
			fontSize,
			fontWeight,
			fontVariant,
			fontStyle,
			limit,
			radius,
			text,
			theta,
		}
	}
}
