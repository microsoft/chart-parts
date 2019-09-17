/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
/* eslint-disable */
const fs = require('fs')
const path = require('path')
const chartPartsReactVersion = require('../../client/react/package.json')
	.version
const chartPartsSvgRendererVersion = require('../../renderers/react-svg/package.json')
	.version

const APP_FILE_CONTENT = `
	import React from 'react'
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
`

const MANIFEST_FILE_CONTENT = `
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}`

const HTML_FILE_CONTENT = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
		<meta
			name="viewport"
			content="width=device-width, initial-scale=1, shrink-to-fit=no"
		/>
		<meta name="theme-color" content="#000000" />
		<link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
		<title>Chart Parts Sample</title>
	</head>
	<body>
		<noscript>You need to enable JavaScript to run this app.</noscript>
		<div id="root"></div>
	</body>
</html>
`

const makePackageJson = (index, isTS) => {
	const result = {
		name: `chart-parts-example-${index}`,
		main: `src/index.tsx`,
		description: 'auto-generated package for codesandbox import',
		private: true,
		version: '0.0.0',
		scripts: {
			start: 'react-scripts start',
			build: 'react-scripts build',
			test: 'react-scripts test --env=jsdom',
			eject: 'react-scripts eject',
		},
		dependencies: {
			react: '16.9.0',
			'react-dom': '16.9.0',
			'react-scripts': '2.1.8',
			'@chart-parts/react': chartPartsReactVersion,
			'@chart-parts/react-svg-renderer': chartPartsSvgRendererVersion,
			typescript: '^3.6.3',
			'@types/react': '^16.9.2',
			'@types/react-dom': '^16.9.0',
			'@types/jest': '^24.0.14',
			'@types/node': '^11.12.0',
		},
		browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
	}
	return result
}

function walk_examples(dir, look_for, done) {
	var results = []
	fs.readdir(dir, (err, list) => {
		if (err) {
			return done(err)
		}

		let pending = list.length
		if (!pending) {
			return done(null, results)
		}

		list.forEach(file => {
			file = path.resolve(dir, file)

			fs.stat(file, (err, stat) => {
				if (stat && stat.isDirectory()) {
					walk_examples(file, look_for, (err, res) => {
						results = results.concat(res)
						if (!--pending) done(null, results)
					})
				} else {
					if (file.endsWith(look_for)) {
						results.push(file)
					}
					if (!--pending) done(null, results)
				}
			})
		})
	})
}

function handleTsExample(err, results) {
	if (err) throw err
	results.forEach((exampleIndex, index) => {
		const exampleDir = path.dirname(exampleIndex)
		console.log('processing example', exampleDir)

		// Move example code into `src`
		const srcDir = path.join(exampleDir, 'src')
		const publicDir = path.join(exampleDir, 'public')
		fs.mkdirSync(srcDir, { recursive: true })
		fs.mkdirSync(publicDir, { recursive: true })

		const exampleFiles = fs.readdirSync(exampleDir)
		exampleFiles.forEach(file => {
			if (file.endsWith('.ts') || file.endsWith('.tsx')) {
				const sourcePath = path.join(exampleDir, file)
				const targetPath = path.join(srcDir, file)
				fs.renameSync(sourcePath, targetPath)
			}
		})

		// Rename index.jsx to example.jsx. Reserve index. for the bootstrapping codes
		fs.renameSync(
			path.join(srcDir, 'index.ts'),
			path.join(srcDir, 'example.ts')
		)

		const packageJsonFile = path.join(exampleDir, 'package.json')
		fs.writeFileSync(
			packageJsonFile,
			JSON.stringify(makePackageJson(index, true), null, 2)
		)

		const sandboxAppFile = path.join(srcDir, 'index.tsx')
		fs.writeFileSync(sandboxAppFile, APP_FILE_CONTENT)

		const htmlFile = path.join(publicDir, 'index.html')
		fs.writeFileSync(htmlFile, HTML_FILE_CONTENT)

		const manifestFile = path.join(publicDir, 'manifest.json')
		fs.writeFileSync(manifestFile, MANIFEST_FILE_CONTENT)

		const envFile = path.join(exampleDir, '.env')
		fs.writeFileSync(envFile, `SKIP_PREFLIGHT_CHECK = true`)
	})
}

// Write TS Examples
walk_examples(
	path.join(__dirname, 'static/examples'),
	'index.ts',
	handleTsExample
)
