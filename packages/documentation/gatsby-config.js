//
// This metadata is used by Gatsby to populate the 'siteMetadata' information in the GraphQL services
//
const siteMetadata = {
  title: 'Markable',
  githubUrl: 'https://github.com/Microsoft/markable',
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
  pathPrefix: '/markable',
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',

    // Handle Markdown Content
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: ['gatsby-remark-prismjs'],
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

    // Syntaxhighlight markdown
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-embed-snippet',
            options: {
              // Example code links are relative to this dir.
              // eg examples/path/to/file.js
              directory: `${__dirname}/src/examples/`,
            },
          },
          'gatsby-remark-prismjs',
        ],
      },
    },
  ],
}
