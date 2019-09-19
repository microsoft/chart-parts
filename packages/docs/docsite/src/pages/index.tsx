/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import React, {
	memo,
	useState,
	useRef,
	useMemo,
	useCallback,
	useEffect,
} from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { Header } from '../components/header'
import HeroBanner from '../components/hero-banner'
import BelowTheFold from '../components/below-the-fold'
import Footer from '../components/footer'
import GlobalStyles from './styles'

const log = require('debug')('site:index')
const packageJson = require('../../package.json')
log('chart-parts documentation, version', packageJson.version)

export interface IndexPageState {
	scrollPercent: number
}

const IndexPage: React.FC = memo(() => {
	const [scrollPercent, setScrollPercent] = useState(0.0)
	const headerOpacity = useMemo(() => Math.max(scrollPercent / 0.6), [
		scrollPercent,
	])
	const scrollAreaRef = useRef<HTMLDivElement>(null)
	const onScroll = useCallback(() => {
		if (scrollAreaRef.current) {
			const current = scrollAreaRef.current as HTMLDivElement
			const value = current.offsetHeight + current.scrollTop
			const start = current.offsetHeight
			const stop = current.scrollHeight
			const newScrollPercent = (value - start) / (stop - start)
			setScrollPercent(newScrollPercent)
		}
	}, [setScrollPercent, scrollAreaRef])

	useEffect(() => {
		const areaDiv = scrollAreaRef.current
		if (areaDiv && areaDiv.scrollHeight === areaDiv.offsetHeight) {
			setScrollPercent(1)
		}
	}, [scrollAreaRef])

	return (
		<Container>
			<GlobalStyles />
			<Helmet title="chart-parts">
				<html lang="en" />
			</Helmet>
			<Header opacity={headerOpacity} />
			<Wrapper>
				<OverflowContainer ref={scrollAreaRef} onScroll={onScroll}>
					<Content>
						<HeroBanner scrollPercent={scrollPercent} />
						<BelowTheFold />
						<Footer />
					</Content>
				</OverflowContainer>
			</Wrapper>
		</Container>
	)
})
IndexPage.displayName = 'IndexPage'
export default IndexPage

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	min-height: 0px;
`

const OverflowContainer = styled.div`
	flex: 1;
	overflow: auto;
`

const Content = styled.div`
	max-height: 200px;
`

const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
`
