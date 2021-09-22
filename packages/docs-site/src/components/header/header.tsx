/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import { Link, graphql, StaticQuery } from 'gatsby'
import { memo } from 'react'
import styled from 'styled-components'
import pkgJson from '../../../../../package.json'
import theme from '../../util/theme'
import Logo from './logo'

const { version: libraryVersion } = pkgJson

export interface HeaderProps {
	logoTo?: string
	opacity?: number
	showLinks?: boolean
}

export const HEIGHT = 60

export const Header: React.FC<HeaderProps> = memo(function Header({
	opacity = 1.0,
	showLinks = true,
}) {
	return (
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
					siteMetadata: { githubUrl },
				},
			}: any) => {
				const links = showLinks ? (
					<>
						<Links>
							<InnerLink to="/">Home</InnerLink>
							<InnerLink to="/documentation">Documentation</InnerLink>
							<InnerLink to="/blog">Blog</InnerLink>
							<OuterLink href={githubUrl}>Github</OuterLink>
						</Links>
					</>
				) : (
					<> </>
				)
				return (
					<Container style={{ opacity }} className="header">
						<InnerContainer>
							<LogoContainer>
								<Logo height={HEIGHT} />
								<VersionIdentifier>v{libraryVersion}</VersionIdentifier>
							</LogoContainer>
							{links}
						</InnerContainer>
					</Container>
				)
			}}
		/>
	)
})

const Container = styled.div`
	background: ${theme.backgrounds.header};
	height: ${HEIGHT}px;
	display: flex;
	top: 0px;
	width: 100%;
`
const LogoContainer = styled.div`
	display: flex;
	width: 400px;
`

const InnerContainer = styled.div`
	flex: 1;
	margin: 0 auto;
	padding: 1.45rem 1.0875rem;
	display: flex;
	justify-content: space-between;
	align-self: stretch;
	align-items: center;
`
const VersionIdentifier = styled.div`
	color: white;
	text-decoration: none;
	font-family: ${theme.text.fontFamily};
	font-weight: 100;
	margin-left: 4px;
	font-size: 14px;
	display: inline-block;
	margin-top: ${HEIGHT / 2}px;
	color: ${theme.palette.highlight};
`

const Links = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`

const InnerLink = styled(Link)`
	color: ${theme.palette.whitish};
	margin-left: 8px;
	margin-right: 8px;
	font-family: ${theme.text.fontFamily};
	font-weight: ${theme.header.linkFontSize};
	font-weight: ${theme.header.linkFontWeight};
`

const OuterLink = styled.a`
	color: ${theme.palette.whitish};
	margin-left: 8px;
	margin-right: 8px;
	font-family: ${theme.text.fontFamily};
	font-weight: ${theme.header.linkFontSize};
	font-weight: ${theme.header.linkFontWeight};
`
