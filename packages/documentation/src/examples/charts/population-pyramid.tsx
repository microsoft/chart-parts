/**
 * Adapted from https://vega.github.io/vega/examples/population-pyramid/
 */
declare var require: any

// tslint:disable
import * as React from 'react'
import { dataset, filter, aggregate } from '@markable/transform'
import {
  Axis,
  Group,
  Chart,
  BandScale,
  Text,
  Rect,
  OrdinalScale,
  LinearScale,
} from '@markable/react'
import {
  VerticalTextAlignment,
  HorizontalAlignment,
  AxisOrientation,
  ScaleCreationContext,
} from '@markable/interfaces'
import { Renderer } from '@markable/react-svg-renderer'

const population = require('vega-datasets/data/population.json')
const renderer = new Renderer()

const chartWidth = 600
const textLineWidth = 12
const AXIS_THICKNESS = 25
const chartPadding = 10
const chartSegmentWidth = (chartWidth - chartPadding * 2 - textLineWidth) / 2

export interface PopulationPyramidState {
  year: number
}
export default class PopulationPyramid extends React.Component<
  {},
  PopulationPyramidState
> {
  public state: PopulationPyramidState = { year: 2000 }
  public render() {
    const { year } = this.state
    const ds = dataset()
      .addTable('population', population)
      .addDerivedTable(
        'popYear',
        'population',
        filter((d: any) => d.year === year)
      )
      .addDerivedTable('males', 'popYear', filter((d: any) => d.sex === 1))
      .addDerivedTable('females', 'popYear', filter((d: any) => d.sex === 2))
      .addDerivedTable('ageGroups', 'population', aggregate().groupBy('age'))

    return (
      <div>
        <PyramidChart data={ds.tables} />
        <YearPicker year={year} onChange={this.handleYearChanged} />
      </div>
    )
  }

  private handleYearChanged = (arg: React.ChangeEvent<any>) => {
    const year = parseInt(arg.target.value, 10)
    this.setState({ year })
  }
}

interface YearPickerProps {
  year: number
  onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void
}
const YearPicker: React.SFC<YearPickerProps> = ({ year, onChange }) => (
  <div style={{ margin: 10, display: 'flex', alignItems: 'center' }}>
    <input
      type="range"
      min="1850"
      max="2000"
      step="10"
      value={year}
      onChange={onChange}
    />
    <p>{year}</p>
  </div>
)

interface PyramidChartProps {
  data: { [key: string]: any[] }
}
const PyramidChart: React.SFC<PyramidChartProps> = ({ data }) => (
  <Chart
    width={chartWidth}
    height={500}
    padding={chartPadding}
    renderer={renderer}
    data={data}
  >
    <BandScale
      name="y"
      bandWidth="yband"
      table="ageGroups"
      range={(arg: ScaleCreationContext) => [
        arg.view.height - AXIS_THICKNESS,
        0,
      ]}
      domain="age"
      padding={0.1}
      round={true}
    />
    <OrdinalScale name="c" domain={['1', '2']} range={['#1f77b4', '#e377c2']} />
    <AgeLabels />
    <MalesPerYear />
    <FemalesPerYear />
  </Chart>
)

const AgeLabels: React.SFC = () => (
  <Text
    table="ageGroups"
    x={chartSegmentWidth + textLineWidth}
    y={({ d }, { y, yband }) => y(d.age) + yband() / 2}
    text={({ d }) => d.age}
    baseline={VerticalTextAlignment.Middle}
    align={HorizontalAlignment.Center}
    fill="#000"
  />
)

const FemalesPerYear: React.SFC = () => (
  <Group
    singleton
    x={0}
    height={({ view }) => view.height}
    width={chartSegmentWidth}
  >
    <LinearScale
      table="population"
      domain="people"
      range={[chartSegmentWidth, 0]}
      name="x"
      nice
      zero
    />
    <Axis
      orient={AxisOrientation.Bottom}
      scale="x"
      labelFormat="~s"
      thickness={AXIS_THICKNESS}
    />
    <Rect
      table="females"
      x={({ d }, { x }) => x(d.people)}
      x2={(d, { x }) => x(0)}
      y={({ d }, { y }) => y(d.age)}
      height={(d, { yband }) => yband()}
      fillOpacity={0.6}
      fill={({ d }, { c }) => c(d.sex)}
    />
  </Group>
)

const MalesPerYear: React.SFC = () => (
  <Group
    singleton
    x={chartSegmentWidth + textLineWidth}
    height={({ view }) => view.height}
    width={chartSegmentWidth}
  >
    <LinearScale
      table="population"
      domain="people"
      name="x"
      range={[textLineWidth, chartSegmentWidth]}
      nice
      zero
    />
    <Axis
      orient={AxisOrientation.Bottom}
      scale="x"
      labelFormat="~s"
      thickness={AXIS_THICKNESS}
    />
    <Rect
      table="males"
      x={({ d }, { x }) => x(d.people)}
      x2={(d, { x }) => x(0)}
      y={({ d }, { y }) => y(d.age)}
      height={(d, { yband }) => yband()}
      fillOpacity={0.6}
      fill={({ d }, { c }) => c(d.sex)}
    />
  </Group>
)
