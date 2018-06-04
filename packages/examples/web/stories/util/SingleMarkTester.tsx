// tslint:disable jsx-no-lambda jsx-no-lambda-props
import * as React from 'react'
import styled from 'styled-components'
import { Chart } from './Chart'
import { Slider } from './Slider'
import { Dropdown } from './Dropdown'

export interface SingleMarkTesterState {
	scenegraph: any
}

export interface SingleMarkTesterProps {
	initialScenegraph: any
	sliders?: Array<{
		name: string
		min?: number
		max?: number
	}>
	dropdowns?: Array<{
		name: string
		options: string[]
	}>
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	width: 600px;
`
const ChartContainer = styled.div`
	border: 1px solid grey;
	margin-right: 25px;
`
const ControlsContainer = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

export class SingleMarkTester extends React.Component<
	SingleMarkTesterProps,
	SingleMarkTesterState
> {
	constructor(props: SingleMarkTesterProps) {
		super(props)
		this.state = { scenegraph: props.initialScenegraph }
	}

	public shouldComponentUpdate() {
		return true
	}

	public render() {
		const { sliders = [], dropdowns = [] } = this.props
		const sliderElements = sliders.map(
			({ name, min, max }: { name: string; min?: number; max?: number }) => (
				<Slider
					key={name}
					name={name}
					min={min}
					max={max}
					value={this.state.scenegraph.items[0][name]}
					onChange={v => this.setParam({ [name]: v })}
				/>
			),
		)
		const dropdownElements = dropdowns.map(({ name, options }) => (
			<Dropdown
				key={name}
				name={name}
				options={options}
				value={this.state.scenegraph.items[0][name]}
				onChange={v => this.setParam({ [name]: v })}
			/>
		))
		return (
			<Container>
				<ChartContainer>
					<Chart data={this.state.scenegraph} />
				</ChartContainer>
				<ControlsContainer>
					{sliderElements}
					{dropdownElements}
				</ControlsContainer>
			</Container>
		)
	}

	private setParam(param: any) {
		this.setState({
			...this.state,
			scenegraph: {
				...this.state.scenegraph,
				items: [
					{
						...this.state.scenegraph.items[0],
						...param,
					},
				],
			},
		})
	}
}
