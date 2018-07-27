// tslint:disable jsx-no-lambda
import * as React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'
import theme from '../util/theme'

interface HeroBannerProps {
  style?: React.CSSProperties
}
const HeroBanner: React.SFC<HeroBannerProps> = ({ style }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, description },
      },
    }) => (
      <Container style={style}>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Container>
    )}
  />
)

const Container = styled.div`
  width: 100%;
  background: ${theme.backgrounds.header};
  font-size: 42px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  color: ${theme.palette.highlight};
`

const Description = styled.h3`
  color: ${theme.palette.highlight};
  font-weight: 300;
`

export default HeroBanner
