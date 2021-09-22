
	import { FC, memo } from 'react'
	import { render } from 'react-dom'
	import Example from './example'
	import { ChartingProvider } from '@chart-parts/react'
	import { Renderer } from '@chart-parts/react-svg-renderer'
  
  const svgRenderer = new Renderer()

  const App: FC = memo(() => (
    <div className="App">
				<ChartingProvider value={svgRenderer}>
					<Example />
				</ChartingProvider>
			</div>
  ))
	
	const rootElement = document.getElementById('root')
	render(<App />, rootElement)	
