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
} from '@markable/transform'
import { Renderer } from '@markable/react-svg-renderer'

// TODO:
// - Axis grid

const renderer = new Renderer()
const source = require('vega-datasets/data/jobs.json')
const ds = dataset()
  .addTable(
    'jobs',
    source,
    stack('perc')
      .groupBy('year')
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

export default class JobVoyager extends React.Component {
  public render() {
    return (
      <Chart
        width={850}
        height={550}
        padding={10}
        renderer={renderer}
        data={ds.tables}
      >
        <LinearScale
          name="x"
          table="jobs"
          domain="year"
          range={Dimension.Width}
          zero={false}
          round={true}
        />
        <LinearScale
          name="y"
          table="jobs"
          domain="y1"
          range={Dimension.Height}
          reverse={true}
          zero={true}
          round={true}
        />
        <OrdinalScale
          name="color"
          domain={['men', 'women']}
          range={['#33f', '#f33']}
        />
        <LinearScale
          name="alpha"
          zero={true}
          table="series"
          domain="sum"
          range={[0.4, 0.8]}
        />
        <SqrtScale
          name="font"
          table="series"
          domain="argmax.perc"
          range={[0, 22]}
          zero={true}
          round={true}
        />
        <QuantizeScale
          name="align"
          table="series"
          domain="argmax.year"
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
          table="series"
          domain="argmax.perc"
          range={[[0, 0, 0, 0, 0, 0.1, 0.2, 0.4, 0.7, 1.0]]}
        />
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
            x={({ d }, { x }) => x(d.year)}
            y={({ d }, { y }) => y(d.y0)}
            y2={({ d }, { y }) => y(d.y1)}
            fill={({ d }, { color }) => color(d.sex)}
            fillOpacity={({ agg }, { alpha }) => alpha(agg.sum)}
          />
        </Group>
        <Text
          table="series"
          x={({ d }, { x }) => x(d.argmax.year)}
          dx={({ d }, { offset }) => offset(d.argmax.year)}
          y={({ d }, { y }) => y(0.5 * (d.argmax.y0 + d.argmax.y1))}
          fill="#000"
          fillOpacity={({ d }, { opacity }) => opacity(d.argmax.perc)}
          fontSize={({ d }, { font }) => font(d.argmax.perc)}
          text={({ d }) => d.job}
          align={({ d }, { align }) => align(d.argmax.year)}
          baseline={VerticalTextAlignment.Middle}
        />
      </Chart>
    )
  }
}
