// tslint:disable jsx-no-lambda
import * as React from 'react'
import styled from 'styled-components'
import { StaticQuery, graphql, withPrefix } from 'gatsby'
import theme from '../util/theme'
import { scaleLinear } from 'd3-scale'

const fadeScale = scaleLinear()
  .domain([0, 1])
  .range([1.0, 0.4])

interface HeroBannerProps {
  style?: React.CSSProperties
  fadePercent: number
}
const HeroBanner: React.SFC<HeroBannerProps> = ({ style, fadePercent }) => (
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
        <InnerContainer fadePercent={fadePercent}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </InnerContainer>
      </ImageContainer>
    )}
  />
)

interface InnerContainerProps {
  fadePercent: number
}
const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(
    ${(props: InnerContainerProps) =>
      [...theme.palette.primary.rgb, fadeScale(props.fadePercent)].join(',')}
  );
`

const ImageContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-image: url("${withPrefix('/images/octopus.jpg')}");
  background-repeat: no-repeat;
  background-size: cover;
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
