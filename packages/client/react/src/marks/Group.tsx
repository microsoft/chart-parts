import { MarkType } from '@markable/interfaces'
import { SceneNodeBuilder, MarkBuilder } from '@markable/builder'
import { CommonMarkProps, MarkEncodingProp } from '../interfaces'
import { BaseMark } from './BaseMark'

export interface GroupProps extends CommonMarkProps {
	clip?: MarkEncodingProp<boolean>
	cornerRadius?: MarkEncodingProp<number>

	/**
	 * If faceting is enabled, the name of the facet table to provide to children
	 */
	facetName?: string

	/**
	 * If faceting is enabled, partitioning key to use
	 */
	facetKey?: string | ((row: any) => any)
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

	protected addMark(): SceneNodeBuilder {
		let node: SceneNodeBuilder | undefined
		this.api.mark(this.createMark().child(n => (node = n)))
		return node as any
	}

	protected createMark(): MarkBuilder {
		const nodeBuilder = super.createMark()
		const { facetName, facetKey } = this.props

		if (facetName || facetKey) {
			if (!facetName || !facetKey) {
				throw new Error(
					'Both facetName and facetKey props must be defined to enable faceting',
				)
			}

			nodeBuilder.facet({
				name: facetName,
				partitionOn: facetKey,
			})
		}
		return nodeBuilder
	}
}
