/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */

import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { SiteMetadata } from '../types'
import Header from './header'
import theme from '../util/theme'
import GlobalStyle from './styles'

interface LayoutQueryResult {
	site: {
		siteMetadata: SiteMetadata
	}
}

export interface LayoutProps {
	sidebar?: JSX.Element
	logoTo?: string
	title?: string
}

const Layout: React.SFC<LayoutProps> = ({
	sidebar = null,
	logoTo,
	children,
	title,
}) => (
	<StaticQuery
		query={graphql`
			query SiteTitleQuery {
				site {
					siteMetadata {
						title
						keywords
						description
					}
				}
			}
		`}
		render={({ site: { siteMetadata } }: LayoutQueryResult) => {
			return (
				<>
					<Helmet
						title={title || siteMetadata.title}
						meta={getMeta(siteMetadata)}
					>
						<html lang="en" />
					</Helmet>
					<BodyContent>
						<GlobalStyle />
						<Header />
						<ContentContainer>
							{sidebar ? <SidebarContainer>{sidebar}</SidebarContainer> : null}
							<Content>{children}</Content>
						</ContentContainer>
					</BodyContent>
				</>
			)
		}}
	/>
)

function getMeta({ description, keywords }: SiteMetadata) {
	return [
		{ name: 'description', content: description },
		{ name: 'keywords', content: keywords.join(', ') },
	]
}

const BodyContent = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
`

const ContentContainer = styled.div`
	display: flex;
	height: 100%;
	flex-direction: row;
	align-items: stretch;
	flex: 1;
	padding: 0;
	margin: 0;
`

const Content = styled.div`
	margin: auto;
	padding: 0px 1.0875rem 1.45rem;
	display: flex;
	flex-direction: column;
	height: 100%;
	flex: 5;
	padding: 1.45rem;
	overflow: scroll;
`

const SidebarContainer = styled.div`
	display: flex;
	flex: 1;
	height: 100%;
	padding: 1rem;
	background: ${theme.backgrounds.sidebar};
`

export default Layout
