// tslint:disable jsx-no-object-literal-props jsx-no-array-literal-props jsx-no-lambda jsx-no-lambda-props
import React from 'react'
import {
	Chart,
	Axis,
	Rect,
	Scale,
	LinearScale,
	BandScale,
	Dimension,
} from '@gog/react'
import { Renderer } from '@gog/react-svg-renderer'
import { storiesOf } from '@storybook/react'

storiesOf('Vega Examples (React Pipeline)', module).add('Bar Chart', () => {
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

	// Externalized State
	const state = {
		hoverRow: undefined,
	}

	// Externalized Event Handlers
	const onMouseOver = ({ element, row }) => {
		// console.log('MOUSEOVER')
		state.hoverRow = row.id
	}
	const onMouseOut = ({ element, row }) => {
		// console.log('MOUSEOUT')
		if (state.hoverRow === row.id) {
			state.hoverRow = undefined
		}
	}

	return (
		<Chart width={400} height={200} data={data} renderer={new Renderer()}>
			<LinearScale name="yscale" bindTo="amount" alignTo={Dimension.HEIGHT} />
			<BandScale
				name="xscale"
				widthName="xband"
				bindTo="category"
				alignTo={Dimension.WIDTH}
			/>

			{/* <Axis orient="bottom" scale="xscale" />
				<Ax is orient="left" scale="yscale" /> */}
			<Rect
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut}
				x={({ row, scales: { xscale } }) => {
					return xscale(row.category)
				}}
				y={({ row, scales: { yscale } }) => yscale(row.amount)}
				y2={200}
				width={({ scales: { xband } }) => xband()}
				fill={({ row }) =>
					state.hoverRow === row ? 'papayawhip' : 'steelblue'
				}
			/>
		</Chart>
	)
})
