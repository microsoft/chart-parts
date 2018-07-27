// tslint:disable jsx-no-lambda
import * as React from 'react'
import { Link, graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import theme from '../util/theme'

export interface HeaderProps {
  logoTo?: string
}

const Header: React.SFC<HeaderProps> = ({ logoTo = '/' }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            githubUrl
          }
        }
      }
    `}
    render={({
      site: {
        siteMetadata: { title, githubUrl },
      },
    }: any) => {
      return (
        <Container>
          <InnerContainer>
            <Title>
              <TitleLink to={logoTo}>{title}</TitleLink>
            </Title>
            <Links>
              <OuterLink to="/">Home</OuterLink>
              <OuterLink to="/documentation">Docs</OuterLink>
              <OuterLink to="/blog">Updates</OuterLink>
              <OuterLink to={githubUrl}>Github</OuterLink>
            </Links>
          </InnerContainer>
        </Container>
      )
    }}
  />
)

const Container = styled.div`
  background: ${theme.backgrounds.header};
`

const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 960;
  padding: 1.45rem 1.0875rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Links = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const Title = styled.h1`
  margin: 0;
`

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-family: ${theme.text.fontFamily};
  font-weight: 100;
`

const OuterLink = styled(Link)`
  color: white;
  margin-left: 8px;
  margin-right: 8px;
  font-family: ${theme.text.fontFamily};
  font-weight: 100;
`

export default Header
