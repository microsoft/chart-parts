import { ChartOptions } from '@gog/xform-sg-interfaces'

const DEFAULT_WIDTH = 250
const DEFAULT_HEIGHT = 250

export class ChartOptionsManager {
	constructor(private options: ChartOptions) {}

	public get width() {
		return this.options.width || DEFAULT_WIDTH
	}

	public get height() {
		return this.options.height || DEFAULT_HEIGHT
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
