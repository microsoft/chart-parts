import { ChartOptions } from '@gog/xform-sg-interfaces'
import { ItemSpace } from '@gog/util'

const DEFAULT_WIDTH = 250
const DEFAULT_HEIGHT = 250

export class ChartOptionsManager {
	constructor(private options: ChartOptions) {}

	public get chartSpace(): ItemSpace {
		const width = this.options.width || DEFAULT_WIDTH
		const height = this.options.height || DEFAULT_HEIGHT
		return {
			origin: {
				x: this.paddingLeft,
				y: this.paddingTop,
			},
			shape: {
				width: width - this.paddingLeft - this.paddingRight,
				height: height - this.paddingTop - this.paddingBottom,
			},
		}
	}

	public get paddingTop() {
		return this.getPadding('top')
	}

	public get paddingBottom() {
		return this.getPadding('bottom')
	}

	public get paddingLeft() {
		return this.getPadding('left')
	}

	public get paddingRight() {
		return this.getPadding('right')
	}

	private getPadding(name: string) {
		const paddingType = typeof this.options.padding
		if (paddingType === 'number') {
			return this.options.padding
		} else if (paddingType === 'object') {
			return (this.options.padding as any)[name] || 0
		}
		return 0
	}
}
