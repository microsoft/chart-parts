// tslint:disable
import * as React from 'react'
import {
	Chart,
	LinearScale,
	BandScale,
	Dimension,
	OrdinalScale,
	CategoricalColorScheme,
	Group,
	// Rect,
	//	Text,
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
const renderer = new Renderer()

const data = [
	{ category: 'A', position: 0, value: 0.1 },
	{ category: 'A', position: 1, value: 0.6 },
	{ category: 'A', position: 2, value: 0.9 },
	{ category: 'A', position: 3, value: 0.4 },
	{ category: 'B', position: 0, value: 0.7 },
	{ category: 'B', position: 1, value: 0.2 },
	{ category: 'B', position: 2, value: 1.1 },
	{ category: 'B', position: 3, value: 0.8 },
	{ category: 'C', position: 0, value: 0.6 },
	{ category: 'C', position: 1, value: 0.1 },
	{ category: 'C', position: 2, value: 0.2 },
	{ category: 'C', position: 3, value: 0.7 },
]

export class GroupedBarChart extends React.Component<{}> {
	public render() {
		return (
			<Chart
				width={300}
				height={500}
				padding={5}
				data={{ data }}
				renderer={renderer}
			>
				<BandScale
					name="y"
					table="data"
					bandWidth="height"
					bindRange={Dimension.HEIGHT}
					bindDomain="category"
					padding={0.2}
				/>
				<LinearScale
					name="x"
					table="data"
					bindRange={Dimension.WIDTH}
					bindDomain="value"
					nice={true}
					zero={true}
				/>
				<OrdinalScale
					name="color"
					table="data"
					bindDomain="position"
					colorScheme={CategoricalColorScheme.category20}
				/>
				<Group
					table="data"
					facetKey={row => row.category}
					facetName="facet"
					y={({ scales: { y }, row }) => y(row[0].category)}
					stroke="black"
					height={({ scales: { height } }) => height()}
				>
					<BandScale
						name="pos"
						bandWidth="rowHeight"
						bindRange={Dimension.HEIGHT}
						table="facet"
						bindDomain="position"
					/>
					<Group
						table="facet"
						y={({ scales: { pos }, row }) => pos(row.position)}
						stroke="red"
						fill="blue"
						fillOpacity={0.1}
						height={({ scales: { rowHeight } }) => rowHeight()}
					/>
					{/* <Rect
						name="bars"
						table="facet"
						y={({ scales: { pos }, row }) => pos(row.position)}
						x={({ scales: { x }, row }) => x(row.value)}
						x2={({ scales: { x } }) => x(0)}
						fill={({ scales: { color }, row }) => color(row.position)}
						height={({ scales: { rowHeight } }) => rowHeight()}
					/> */}
					{/* <Text
						singleton={true}
						//						table="bars"
						//x={({ row }) => row.x2 - 5}
						//						y={({ row }) => row.y - row.height * 0.5}
						fill={'white'}
						align={'right'}
						baseline={'middle'}
						//						text={({ row }) => row.datum.value}
						text={'Some text'}
					/> */}
				</Group>
			</Chart>
		)
	}
}
