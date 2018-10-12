/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

// tslint:disable jsx-no-lambda
import * as React from 'react'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import Header from '../components/header'
import HeroBanner from '../components/hero-banner'
import BelowTheFold from '../components/below-the-fold'
import Footer from '../components/footer'
import './site.css'

// tslint:disable-next-line
const log = require('debug')('site:index')

// tslint:disable-next-line no-var-requires
const packageJson = require('../../package.json')
// tslint:disable-next-line no-console
log('chart-parts documentation, version', packageJson.version)

export interface IndexPageState {
  scrollPercent: number
}

export default class IndexPage extends React.Component {
  public state: IndexPageState = { scrollPercent: 0.0 }
  private scrollAreaRef: React.RefObject<HTMLDivElement> = React.createRef()

  public componentDidMount() {
    // If all content is visible, show the header
    if (this.isAllContentVisible) {
      this.setState({ scrollPercent: 1.0 })
    }
  }

  public render() {
    const { scrollPercent } = this.state
    return (
      <Container>
        <Helmet title="chart-parts">
          <html lang="en" />
        </Helmet>
        <Header opacity={Math.max(scrollPercent / 0.6)} />
        <Wrapper>
          <OverflowContainer
            innerRef={this.scrollAreaRef}
            onScroll={this.onScroll}
          >
            <Content>
              <HeroBanner fadePercent={scrollPercent} />
              <BelowTheFold />
              <Footer />
            </Content>
          </OverflowContainer>
        </Wrapper>
      </Container>
    )
  }

  private onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPercent = this.scrollPercent
    this.setState({ scrollPercent })
  }

  /**
   * Gets the percentage the user has scrolled across the scrollable area
   */
  private get scrollPercent() {
    const current = this.scrollAreaRef.current as HTMLDivElement
    const value = current.offsetHeight + current.scrollTop
    const start = current.offsetHeight
    const stop = current.scrollHeight
    return (value - start) / (stop - start)
  }

  /**
   * Determines if all content is visible prior to any scrolling interaction.
   */
  private get isAllContentVisible() {
    const current = this.scrollAreaRef.current as HTMLDivElement
    return current.scrollHeight === current.offsetHeight
  }
}

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
