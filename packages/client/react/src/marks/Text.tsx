import { MarkType } from '@markable/interfaces'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface TextProps extends CommonMarkProps {
	align?: MarkEncodingProp
	angle?: MarkEncodingProp
	baseline?: MarkEncodingProp
	dir?: MarkEncodingProp
	dx?: MarkEncodingProp
	dy?: MarkEncodingProp
	ellipsis?: MarkEncodingProp
	font?: MarkEncodingProp
	fontSize?: MarkEncodingProp
	fontWeight?: MarkEncodingProp
	fontVariant?: MarkEncodingProp
	fontStyle?: MarkEncodingProp
	limit?: MarkEncodingProp
	radius?: MarkEncodingProp
	text?: MarkEncodingProp
	theta?: MarkEncodingProp
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
