// tslint:disable
import * as React from 'react'
import {
	Chart,
	Group,
	Rect,
	Dimension,
	LinearScale,
	BandScale,
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'

export interface GroupGridState {
	hoverRowIndex: number | undefined
}

const CHART_WIDTH = 600
const CHART_HEIGHT = 600
const CELL_WIDTH = CHART_WIDTH / 3
const CELL_HEIGHT = CHART_HEIGHT / 3

const cells = [
	{ x: 0, y: 0 },
	{ x: 1, y: 0 },
	{ x: 2, y: 0 },
	{ x: 0, y: 1 },
	{ x: 1, y: 1 },
	{ x: 2, y: 1 },
	{ x: 0, y: 2 },
	{ x: 1, y: 2 },
	{ x: 2, y: 2 },
]

const data = [
	{ x: 0, y: 28, c: 0 },
	{ x: 0, y: 55, c: 1 },
	{ x: 1, y: 43, c: 0 },
	{ x: 1, y: 91, c: 1 },
	{ x: 2, y: 81, c: 0 },
	{ x: 2, y: 53, c: 1 },
	{ x: 3, y: 19, c: 0 },
	{ x: 3, y: 87, c: 1 },
	{ x: 4, y: 52, c: 0 },
	{ x: 4, y: 48, c: 1 },
	{ x: 5, y: 24, c: 0 },
	{ x: 5, y: 49, c: 1 },
	{ x: 6, y: 87, c: 0 },
	{ x: 6, y: 66, c: 1 },
	{ x: 7, y: 17, c: 0 },
	{ x: 7, y: 27, c: 1 },
	{ x: 8, y: 68, c: 0 },
	{ x: 8, y: 16, c: 1 },
	{ x: 9, y: 49, c: 0 },
	{ x: 9, y: 15, c: 1 },
]

export class GroupGrid extends React.Component<{}, GroupGridState> {
	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
	}

	public render() {
		return (
			<Chart
				width={CHART_WIDTH}
				height={CHART_HEIGHT}
				data={{ cells, data }}
				renderer={new Renderer()}
			>
				<Group
					table="cells"
					width={CELL_WIDTH}
					height={CELL_HEIGHT}
					x={({ row }) => CELL_WIDTH * row.x}
					y={({ row }) => CELL_HEIGHT * row.y}
					fill="transparent"
					stroke="#ddd"
				>
					<LinearScale
						name="yscale"
						table="data"
						bindDomain="amount"
						bindRange={Dimension.HEIGHT}
						nice={true}
					/>
					<BandScale
						table="data"
						name="xscale"
						bandWidth="xband"
						bindDomain="category"
						padding={0.05}
						bindRange={Dimension.WIDTH}
					/>
					<Rect table="data" width={30} height={100} />
				</Group>
			</Chart>
		)
	}
}
