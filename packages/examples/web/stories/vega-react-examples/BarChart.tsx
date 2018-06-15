// tslint:disable
import * as React from 'react'
import { Chart, Rect, LinearScale, BandScale, Dimension } from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'

const renderer = new Renderer()

const data = [
	{ category: 'A', amount: 28 },
	{ category: 'B', amount: 55 },
	{ category: 'C', amount: 43 },
	{ category: 'D', amount: 91 },
	{ category: 'E', amount: 81 },
	{ category: 'F', amount: 53 },
	{ category: 'G', amount: 19 },
	{ category: 'H', amount: 87 },
]

export interface BarChartState {
	hoverRowIndex: number | undefined
}

export class BarChart extends React.Component<{}, BarChartState> {
	constructor(props: {}) {
		super(props)
		this.state = { hoverRowIndex: undefined }
	}

	public render() {
		console.log('Render Chart')
		// Externalized Event Handlers
		const onMouseEnter = ({ metadata: { dataRowIndex } }: any) => {
			if (this.state.hoverRowIndex !== dataRowIndex) {
				this.setState({ hoverRowIndex: dataRowIndex })
			}
		}
		const onMouseLeave = ({ metadata: { dataRowIndex } }: any) => {
			if (this.state.hoverRowIndex === dataRowIndex) {
				this.setState({ hoverRowIndex: undefined })
			}
		}

		return (
			<Chart width={400} height={200} renderer={renderer} data={{ data }}>
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
					widthName="xband"
					bindDomain="category"
					padding={0.05}
					bindRange={Dimension.WIDTH}
				/>
				{/* <Axis orient="bottom" scale="xscale" />
				<Ax is orient="left" scale="yscale" /> */}
				<Rect
					table="data"
					eventHandlers={{ onMouseEnter, onMouseLeave }}
					x={({ row, scales: { xscale } }) => xscale(row.category)}
					y={({ row, scales: { yscale } }) => yscale(row.amount)}
					width={({ scales: { xband } }) => xband()}
					y2={200}
					fill={({ rowIndex }) => {
						return this.state.hoverRowIndex === rowIndex
							? 'firebrick'
							: 'steelblue'
					}}
				/>
			</Chart>
		)
	}
}
