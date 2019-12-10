
	import React, { memo } from 'react'
	import ReactDOM from 'react-dom'
	import Example from './example'
	import { ChartingProvider } from '@chart-parts/react'
	import { Renderer } from '@chart-parts/react-svg-renderer'
  
  const svgRenderer = new Renderer()

  const App: React.FC = memo(() => (
    <div className="App">
				<ChartingProvider value={svgRenderer}>
					<Example />
				</ChartingProvider>
			</div>
  ))
	
	const rootElement = document.getElementById('root')
	ReactDOM.render(<App />, rootElement)	
