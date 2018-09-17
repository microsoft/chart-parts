// tslint:disable
import * as React from 'react'
import {
  Axis,
  Chart,
  Rect,
  LinearScale,
  BandScale,
  Dimension,
  Text,
} from '@markable/react'
import {
  AxisOrientation,
  VerticalTextAlignment,
  HorizontalAlignment,
} from '@markable/interfaces'
import { Renderer } from '@markable/react-svg-renderer'

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

/**
 * Adapted from https://vega.github.io/vega/examples/bar-chart/
 */
export default class BarChart extends React.Component<{}, BarChartState> {
  public state: BarChartState = { hoverRowIndex: undefined }

  public render() {
    const { hoverRowIndex } = this.state
    return (
      <Chart width={400} height={200} renderer={renderer} data={{ data }}>
        <LinearScale
          name="y"
          domain="data.amount"
          range={Dimension.Height}
          nice
          zero
        />
        <BandScale
          name="x"
          bandWidth="band"
          domain="data.category"
          padding={0.05}
          range={Dimension.Width}
        />
        <Axis orient={AxisOrientation.Bottom} scale="x" />
        <Axis orient={AxisOrientation.Left} scale="y" />
        <Rect
          table="data"
          onMouseEnter={({ index }: any) => {
            if (hoverRowIndex !== index) {
              this.setState({ hoverRowIndex: index })
            }
          }}
          onMouseLeave={({ index }: any) => {
            if (hoverRowIndex === index) {
              this.setState({ hoverRowIndex: undefined })
            }
          }}
          x={({ d, x }: any) => x(d.category)}
          y={({ d, y }: any) => y(d.amount)}
          width={({ band }: any) => band()}
          y2={({ y }: any) => y(0)}
          fill={({ index }: any) =>
            hoverRowIndex === index ? 'firebrick' : 'steelblue'
          }
        />
        {hoverRowIndex === undefined ? null : (
          <Text
            singleton
            text={d => d.data[hoverRowIndex].amount}
            fill="black"
            x={({ data, x, band }: any) =>
              x(data[hoverRowIndex].category) + band() / 2
            }
            y={({ data, y }: any) => y(data[hoverRowIndex].amount) - 3}
            baseline={VerticalTextAlignment.Bottom}
            align={HorizontalAlignment.Center}
          />
        )}
      </Chart>
    )
  }
}
