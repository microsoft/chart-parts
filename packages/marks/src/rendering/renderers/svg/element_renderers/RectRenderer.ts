import { Path } from 'd3-path'
import { Mark, Rect } from '@gog/marks'
import { rectangle } from '../path/shapes'

export interface MarkRenderer<T> {
	render(mark: Mark): void
}

export class RectRenderer implements MarkRenderer<Rect> {
	public render(mark: Mark) {
		if (mark.marktype !== Rect.ITEM_TYPE) {
			throw new Error(`Mark must be of type ${Rect.ITEM_TYPE}`)
		}

		// Render each item for the mark
		console.log('Rendering ' + mark.items.length + ' items')
		const renderedItems = mark.items.map(item => {
			const rendered = rectangle(undefined, item, 0, 0)
			return { element: 'path', attrs: { d: rendered } }
		})

		return renderedItems
	}
}
