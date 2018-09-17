// tslint:disable
import * as React from 'react'
import {
  Area,
  Group,
  Chart,
  LinearScale,
  OrdinalScale,
  SqrtScale,
  Axis,
  Text,
  QuantizeScale,
  QuantileScale,
} from '@markable/react'
import {
  Dimension,
  AxisOrientation,
  VerticalTextAlignment,
  HorizontalAlignment,
} from '@markable/interfaces'
import {
  dataset,
  stack,
  CompareOrder,
  aggregate,
  AggregateOperation,
  Offset as StackOffset,
  filter,
} from '@markable/transform'
import { Renderer } from '@markable/react-svg-renderer'
// import { extent } from 'd3-array'

// TODO:
// - Axis grid

const renderer = new Renderer()
const source = require('vega-datasets/data/jobs.json')
const genderOptions = ['all', 'women', 'men']

export interface JobVoyagerState {
  gender: string
  selectedAreaId?: string
}

export default class JobVoyager extends React.Component<{}, JobVoyagerState> {
  public state = { gender: 'all', selectedAreaId: undefined }

  public render() {
    const { gender, selectedAreaId } = this.state
    console.log('Render for gender', gender)
    const ds = dataset()
      .addTable(
        'jobs',
        source,
        filter((d: any) => d.sex === gender || gender === 'all'),
        stack('perc')
          .groupBy('year')
          .offset(StackOffset.zero)
          .sort(
            {
              field: 'job',
              order: CompareOrder.descending,
            },
            {
              field: 'sex',
              order: CompareOrder.descending,
            }
          )
      )
      .addDerivedTable(
        'series',
        'jobs',
        aggregate()
          .groupBy('job', 'sex')
          .compute(
            { op: AggregateOperation.sum, field: 'perc', as: 'sum' },
            { op: AggregateOperation.argmax, field: 'perc', as: 'argmax' }
          )
      )

    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <JobVoyagerChart
          data={ds.tables}
          selectedAreaId={selectedAreaId}
          onEnterArea={this.onEnterArea}
          onClickArea={this.onClickArea}
        />
        <div>
          <div>
            {genderOptions.map(g => [
              <input
                id={`gender-option-${g}`}
                key={`input:${g}`}
                type="radio"
                style={{ margin: 4 }}
                checked={gender === g}
                value={g}
                onChange={this.changeGenderSelection}
              />,
              <label key={`label:${g}`} style={{ margin: 4 }}>
                {g}
              </label>,
            ])}
          </div>
        </div>
      </div>
    )
  }

  private changeGenderSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ gender: e.target.value })
  }

  private onEnterArea = (id: string) => {
    this.setState({ selectedAreaId: id })
  }

  private onClickArea = (id: string) => {
    console.log('Click area', id)
  }
}

interface JobVoyagerChartProps {
  data: any
  selectedAreaId?: string
  onEnterArea: (id: string) => any
  onClickArea: (id: string) => any
}
const JobVoyagerChart: React.SFC<JobVoyagerChartProps> = ({
  data,
  selectedAreaId,
  onEnterArea,
  onClickArea,
}) => (
  <Chart width={850} height={550} padding={10} renderer={renderer} data={data}>
    <Scales />
    <Axes />

    <Group
      table="series"
      facet={{
        groupBy: ['job', 'sex'],
        keyRowName: 'agg',
        table: 'jobs',
        name: 'facet',
      }}
    >
      <Area
        table="facet"
        x={({ d, x }) => x(d.year)}
        y={({ d, y }) => y(d.y0)}
        y2={({ d, y }) => y(d.y1)}
        fill={({ d, color }) => color(d.sex)}
        fillOpacity={({ agg, id, alpha }) =>
          id === selectedAreaId ? 0.2 : alpha(agg.sum)
        }
        onMouseOver={({ id }) => onEnterArea(id)}
        onClick={({ id }) => onClickArea(id)}
      />
    </Group>
    <Text
      table="series"
      x={({ d, x }) => x(d.argmax.year)}
      dx={({ d, offset }) => offset(d.argmax.year)}
      y={({ d, y }) => y(0.5 * (d.argmax.y0 + d.argmax.y1))}
      fill="#000"
      fillOpacity={({ d, opacity }) => opacity(d.argmax.perc)}
      fontSize={({ d, font }) => font(d.argmax.perc)}
      text={({ d }) => d.job}
      align={({ d, align }) => align(d.argmax.year)}
      baseline={VerticalTextAlignment.Middle}
    />
  </Chart>
)

const Axes: React.SFC = () => (
  <>
    <Axis
      orient={AxisOrientation.Bottom}
      scale="x"
      labelFormat="d"
      tickCount={15}
      domain={false}
    />
    <Axis
      orient={AxisOrientation.Right}
      scale="y"
      labelFormat="~%"
      domain={false}
      tickSize={12}
    />
  </>
)

const Scales: React.SFC = () => (
  <>
    <LinearScale
      name="x"
      domain="jobs.year"
      range={Dimension.Width}
      zero={false}
      round
    />
    <LinearScale
      name="y"
      domain="jobs.y1"
      range={Dimension.Height}
      reverse
      zero
      round
    />
    <OrdinalScale
      name="color"
      domain={['men', 'women']}
      range={['#33f', '#f33']}
    />
    <LinearScale name="alpha" zero domain="series.sum" range={[0.4, 0.8]} />
    <SqrtScale
      name="font"
      domain="series.argmax.perc"
      range={[0, 22]}
      zero
      round
    />
    <QuantizeScale
      name="align"
      domain="series.argmax.year"
      range={[
        HorizontalAlignment.Left,
        HorizontalAlignment.Center,
        HorizontalAlignment.Right,
      ]}
    />
    <QuantizeScale
      name="offset"
      domain={[1730, 2130]}
      range={[6, 0, -6]}
      zero={false}
    />
    <QuantileScale
      name="opacity"
      domain="series.argmax.perc"
      range={[[0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0]]}
    />
  </>
)
