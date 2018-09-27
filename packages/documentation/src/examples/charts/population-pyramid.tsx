/**
 * Adapted from https://vega.github.io/vega/examples/population-pyramid/
 */
declare var require: any

// tslint:disable
import * as React from 'react'
import { dataset, filter, aggregate } from '@chart-parts/transform'
import {
  Axis,
  Group,
  Chart,
  BandScale,
  Text,
  Rect,
  OrdinalScale,
  LinearScale,
} from '@chart-parts/react'
import {
  VerticalTextAlignment,
  HorizontalAlignment,
  AxisOrientation,
  ScaleCreationContext,
} from '@chart-parts/interfaces'
import { Renderer } from '@chart-parts/react-svg-renderer'

const population = require('vega-datasets/data/population.json')
const renderer = new Renderer()

const chartWidth = 600
const chartHeight = 500
const textLineWidth = 18
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
    height={chartHeight}
    padding={chartPadding}
    renderer={renderer}
    data={data}
  >
    <ChartScales />
    <AgeLabels />
    <MPerYear />
    <FPerYear />
  </Chart>
)

const ChartScales: React.SFC = () => (
  <>
    <BandScale
      name="y"
      bandWidth="yband"
      range={(arg: ScaleCreationContext) => [
        arg.view.height - AXIS_THICKNESS,
        0,
      ]}
      domain="ageGroups.age"
      padding={0.1}
      round
    />
    <OrdinalScale name="c" domain={['1', '2']} range={['#1f77b4', '#e377c2']} />
  </>
)

const AgeLabels: React.SFC = () => (
  <Text
    table="ageGroups"
    x={chartSegmentWidth + textLineWidth / 2}
    y={({ d, y, yband }) => y(d.age) + yband() / 2}
    text={({ d }) => d.age}
    baseline={VerticalTextAlignment.Middle}
    align={HorizontalAlignment.Center}
    fill="#000"
  />
)

const FPerYear: React.SFC = () => (
  <GenderPerYearSection
    xStart={0}
    table="females"
    xRange={[chartSegmentWidth, 0]}
  />
)

const MPerYear: React.SFC = () => (
  <GenderPerYearSection
    table="males"
    xStart={chartSegmentWidth + textLineWidth}
    xRange={[0, chartSegmentWidth]}
  />
)

interface GenderPerYearSectionProps {
  table: string
  xRange: [number, number]
  xStart: number
}
const GenderPerYearSection: React.SFC<GenderPerYearSectionProps> = ({
  table,
  xRange,
  xStart,
}) => (
  <Group
    x={xStart}
    height={({ view }) => view.height}
    width={chartSegmentWidth}
  >
    <LinearScale domain="population.people" range={xRange} name="x" nice zero />
    <Axis
      orient={AxisOrientation.Bottom}
      scale="x"
      labelFormat="~s"
      thickness={AXIS_THICKNESS}
    />
    <GenderPerYearRect table={table} />
  </Group>
)

interface GenderPerYearRectProps {
  table: string
}

const GenderPerYearRect: React.SFC<GenderPerYearRectProps> = ({ table }) => (
  <Rect
    table={table}
    x={({ d, x }) => x(d.people)}
    x2={({ x }) => x(0)}
    y={({ d, y }) => y(d.age)}
    height={({ yband }) => yband()}
    fillOpacity={0.6}
    fill={({ d, c }) => c(d.sex)}
  />
)
