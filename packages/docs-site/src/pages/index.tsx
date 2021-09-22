/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import dbg from 'debug'
import { memo } from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import packageJson from '../../package.json'
import Splash from '../components/splash/splash'
import GlobalStyles from './styles'

const log = dbg('site:index')
log('chart-parts documentation, version', packageJson.version)

export interface IndexPageState {
	scrollPercent: number
}

const IndexPage: React.FC = memo(function IndexPage() {
	return (
		<Container>
			<GlobalStyles />
			<Helmet title="chart-parts">
				<html lang="en" />
				<link
					href="https://fonts.googleapis.com/css?family=Josefin+Sans|Roboto+Mono&display=swap"
					rel="stylesheet"
				></link>
			</Helmet>
			<Splash />
		</Container>
	)
})
export default IndexPage

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`
