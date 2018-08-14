// tslint:disable jsx-no-lambda
import * as React from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import HeroBanner from '../components/hero-banner'
import BelowTheFold from '../components/below-the-fold'
import './site.css'

export default () => (
  <Container>
    <Header />
    <HeroBanner style={{ flex: 4 }} />
    <BelowTheFold style={{ flex: 1 }} />
  </Container>
)

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 110%;
`

export const BoxRow = styled.div`
  display: flex;
`

export const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
