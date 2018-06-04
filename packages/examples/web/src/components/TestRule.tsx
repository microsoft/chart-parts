// tslint:disable
import React from 'react'
import { VirtualSvgPipeline } from '@gog/core'
import { Renderer } from '@gog/react-svg-renderer'

const pipeline = new VirtualSvgPipeline(new Renderer())
const Chart = ({ data }) => {
	return pipeline.handle(data, { width: 435, height: 239 })
}

interface TestRuleState {
	data: any
}

const Slider = ({
	name,
	min = 0,
	max = 200,
	value,
	onChange = (value: any) => null,
}) => (
	<div style={{ display: 'flex' }}>
		<div style={{ width: 80 }}>{name}</div>
		<input
			style={{ flex: 2 }}
			type="range"
			name={name}
			value={value}
			min={min}
			max={max}
			step="1"
			onChange={evt => onChange(evt.target.value)}
		/>
		<div>{value}</div>
	</div>
)

export default class TestRule extends React.Component<{}, TestRuleState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			data: {
				marktype: 'rule',
				items: [
					{
						x: 50,
						y: 50,
						x2: 100,
						y2: 100,
						stroke: '#DC143C',
						strokeWidth: 4,
						strokeCap: 'butt',
						strokeDash: [1, 0],
					},
				],
			},
		}
	}

	public render() {
		return (
			<div style={{ display: 'flex', flexDirection: 'row', width: 600 }}>
				<div style={{ flex: 1 }}>
					<Chart data={this.state.data} />
				</div>
				<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
					<Slider
						name="x"
						value={this.state.data.items[0].x}
						onChange={x => this.setRectParam({ x })}
					/>
					<Slider
						name="y"
						value={this.state.data.items[0].y}
						onChange={y => this.setRectParam({ y })}
					/>
					<Slider
						name="x2"
						value={this.state.data.items[0].x2}
						onChange={x2 => this.setRectParam({ x2 })}
					/>
					<Slider
						name="y2"
						value={this.state.data.items[0].y2}
						onChange={y2 => this.setRectParam({ y2 })}
					/>
					<Slider
						name="strokeWidth"
						value={this.state.data.items[0].strokeWidth}
						max={10}
						onChange={strokeWidth => this.setRectParam({ strokeWidth })}
					/>
				</div>
			</div>
		)
	}

	private setRectParam(param: any) {
		this.setState({
			...this.state,
			data: {
				...this.state.data,
				items: [
					{
						...this.state.data.items[0],
						...param,
					},
				],
			},
		})
	}
}
