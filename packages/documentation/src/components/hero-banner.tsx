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
      <ImageContainer style={style}>
        <InnerContainer>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </InnerContainer>
      </ImageContainer>
    )}
  />
)

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(${theme.palette.primary.rgb.join(',')});  
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`

const Title = styled.h1`
  color: ${theme.palette.highlight};
  font-weight: lighter;
  font-size: 120px;
  border: none;
`

const Description = styled.h3`
  color: ${theme.palette.highlight};
  font-weight: 300;
`

export default HeroBanner
