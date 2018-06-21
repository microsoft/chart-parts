import * as React from 'react'
import { MarkType } from '@gog/mark-interfaces'
import { MarkEncoding } from '@gog/mark-spec-interfaces'
import { CommonMarkProps } from '../interfaces'
import { BaseMark } from './BaseMark'
import { ChartNode } from '../ChartNode'

export interface Facet {
	/**
	 * the name of the generanted facet
	 */
	name: string

	/**
	 * The name of the source table to facet from
	 */
	table: string
}
export interface GroupProps extends CommonMarkProps {
	clip?: MarkEncoding
	cornerRadius?: MarkEncoding
	facet?: Facet
}

export class Group extends BaseMark<GroupProps> {
	public markType = MarkType.Group

	protected encodeCustomProperties() {
		const { clip, cornerRadius } = this.props
		return {
			clip,
			cornerRadius,
		}
	}

	protected renderInner() {
		return <ChartNode>{this.props.children}</ChartNode>
	}
}
