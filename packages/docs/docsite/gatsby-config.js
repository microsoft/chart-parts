/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
//
// This metadata is used by Gatsby to populate the 'siteMetadata' information in the GraphQL services
//
const siteMetadata = {
	title: 'chart-parts',
	githubUrl: 'https://github.com/Microsoft/chart-parts',
	description:
		'A flexible, React-friendly, Grammar of Graphics for data visualization',
	keywords: [
		'visualization',
		'dataviz',
		'grammar of graphics',
		'mark-based visualization',
	],
}

module.exports = {
	siteMetadata,
	pathPrefix: '/chart-parts',
	plugins: [
		'gatsby-plugin-typescript',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-styled-components',

		// Handle Markdown Content
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: ['gatsby-remark-prismjs', `gatsby-remark-autolink-headers`],
			},
		},

		// Load up typography style settings
		{
			resolve: 'gatsby-plugin-typography',
			options: {
				pathToConfigModule: 'src/configs/typography.js',
			},
		},

		// Read markdown from the filesystem and load it into the services
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/markdown`,
			},
		},
	],
}
