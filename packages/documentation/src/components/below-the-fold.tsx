// tslint:disable jsx-no-lambda
import * as React from 'react'
import styled from 'styled-components'
import { Link, StaticQuery, graphql } from 'gatsby'
import theme from '../util/theme'

interface BelowTheFoldProps {
  style?: React.CSSProperties
}

const BelowTheFold: React.SFC<BelowTheFoldProps> = ({ style }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            githubUrl
          }
        }
      }
    `}
    render={data => {
      const {
        site: {
          siteMetadata: { githubUrl },
        },
      } = data
      return (
        <BoxRow style={style}>
          <Box style={{ backgroundColor: theme.palette.alt }}>
            <StyledLink to="/documentation">Read the docs</StyledLink>
          </Box>
          <Box style={{ backgroundColor: theme.palette.alt2 }}>
            <StyledLink to="/blog">What's new?</StyledLink>
          </Box>
          <Box style={{ backgroundColor: theme.palette.alt3 }}>
            <StyledLink to={githubUrl}>Browse the source</StyledLink>
          </Box>
        </BoxRow>
      )
    }}
  />
)

export const BoxRow = styled.div`
  display: flex;
  flex: 1;
`

export const Box = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
`

export const StyledLink = styled(Link)`
  font-family: ${theme.text.fontFamily};
  font-weight: bold;
  font-size: 16px;
  color: ${theme.palette.highlight};
`
export default BelowTheFold
