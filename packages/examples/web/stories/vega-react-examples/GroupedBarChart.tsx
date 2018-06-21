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
	Rect,
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
const renderer = new Renderer()
/*
{
  "scales": [
     {
      "name": "xscale",
      "type": "linear",
      "domain": {"data": "table", "field": "value"},
      "range": "width",
      "round": true,
      "zero": true,
      "nice": true
    },
    {
      "name": "color",
      "type": "ordinal",
      "domain": {"data": "table", "field": "position"},
      "range": {"scheme": "category20"}
    }
  ],

  "axes": [
    {"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1},
    {"orient": "bottom", "scale": "xscale"}
  ],

  "marks": [
    {
      "type": "group",

      "from": {
        "facet": {
          "data": "table",
          "name": "facet",
          "groupby": "category"
        }
      },

      "encode": {
        "enter": {
          "y": {"scale": "yscale", "field": "category"}
        }
      },

      "signals": [
        {"name": "height", "update": "bandwidth('yscale')"}
      ],

      "scales": [
        {
          "name": "pos",
          "type": "band",
          "range": "height",
          "domain": {"data": "facet", "field": "position"}
        }
      ],

      "marks": [
        {
          "name": "bars",
          "from": {"data": "facet"},
          "type": "rect",
          "encode": {
            "enter": {
              "y": {"scale": "pos", "field": "position"},
              "height": {"scale": "pos", "band": 1},
              "x": {"scale": "xscale", "field": "value"},
              "x2": {"scale": "xscale", "value": 0},
              "fill": {"scale": "color", "field": "position"}
            }
          }
        },
        {
          "type": "text",
          "from": {"data": "bars"},
          "encode": {
            "enter": {
              "x": {"field": "x2", "offset": -5},
              "y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
              "fill": {"value": "white"},
              "align": {"value": "right"},
              "baseline": {"value": "middle"},
              "text": {"field": "datum.value"}
            }
          }
        }
      ]
    }
  ]
}
*/

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
				height={240}
				padding={5}
				data={{ data }}
				renderer={renderer}
			>
				<BandScale
					name="y"
					table="data"
					widthName="width"
					bindRange={Dimension.HEIGHT}
					bindDomain="category"
					padding={0.02}
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
					colorScheme={CategoricalColorScheme.category10}
				/>
				<Group
					table="data"
					y={({ scales: { yscale }, row }) => yscale(row.category)}
				/>
				<Rect
					table="data"
					x={({ scales: { x }, row }) => x(row.x)}
					width={({ scales: { width }, row }) => width() - 1}
					y={({ scales: { y }, row }) => y(row.y0)}
					y2={({ scales: { y }, row }) => y(row.y1)}
					fill={({ scales: { color }, row }) => color(row.c)}
				/>
			</Chart>
		)
	}
}
