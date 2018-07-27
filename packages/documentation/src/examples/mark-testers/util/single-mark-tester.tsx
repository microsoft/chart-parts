// tslint:disable jsx-no-lambda jsx-no-lambda-props react-component-classes-should-implement-scu
import * as React from 'react'
import styled from 'styled-components'
import { SGChart } from './chart'
import { Slider } from './slider'
import { Dropdown } from './dropdown'
import { Toggle } from './toggle'

export interface SingleMarkTesterState {
  scenegraph: any
}

export interface SliderSpec {
  name: string
  min?: number
  max?: number
  step?: number
}

export interface DropdownSpec {
  name: string
  options: string[]
}

export interface ToggleSpec {
  name: string
}

export interface SingleMarkTesterProps {
  initialScenegraph: any
  sliders?: SliderSpec[]
  dropdowns?: DropdownSpec[]
  toggles?: ToggleSpec[]
  chartWidth?: number
  chartHeight?: number
  chartOrigin?: [number, number]
  updateScenegraph?: (update?: any, scenegraph?: any) => any
  getParam?: (name: string, scenegraph: any) => any
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

  public render() {
    const {
      sliders = [],
      dropdowns = [],
      toggles = [],
      chartWidth,
      chartHeight,
      chartOrigin,
    } = this.props
    const sliderElements = sliders.map(({ name, min, max, step }) => (
      <Slider
        key={name}
        name={name}
        min={min}
        max={max}
        step={step}
        value={this.getParam(name)}
        onChange={v =>
          this.setParam({ [name]: typeof v === 'string' ? parseFloat(v) : v })
        }
      />
    ))
    const dropdownElements = dropdowns.map(({ name, options }) => (
      <Dropdown
        key={name}
        name={name}
        options={options}
        value={this.getParam(name)}
        onChange={v => this.setParam({ [name]: v }) as any}
      />
    ))
    const toggleElements = toggles.map(({ name }) => (
      <Toggle
        key={name}
        name={name}
        value={this.getParam(name)}
        onChange={v => this.setParam({ [name]: v })}
      />
    ))
    return (
      <Container>
        <ChartContainer>
          <SGChart
            data={this.state.scenegraph}
            width={chartWidth}
            height={chartHeight}
            origin={chartOrigin}
          />
        </ChartContainer>
        <ControlsContainer>
          {toggleElements}
          {sliderElements}
          {dropdownElements}
        </ControlsContainer>
      </Container>
    )
  }

  private getParam(name: string) {
    return this.props.getParam
      ? this.props.getParam(name, this.state.scenegraph)
      : this.state.scenegraph.items[0][name]
  }

  private setParam(update: any) {
    const scenegraph = this.updateScenegraph(update, this.state.scenegraph)
    this.setState({ ...this.state, scenegraph })
  }

  private updateScenegraph(update: any, scenegraph: any) {
    if (this.props.updateScenegraph) {
      return this.props.updateScenegraph(update, scenegraph)
    } else {
      return {
        ...scenegraph,
        items: [
          {
            ...scenegraph.items[0],
            ...update,
          },
        ],
      }
    }
  }
}
