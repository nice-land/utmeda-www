const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'Útmeða',
  },
  plugins: [
    'gatsby-plugin-ueno',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Útmeða',
        short_name: 'Útmeða',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#000000',
        display: 'minimal-ui',
        icon: 'src/assets/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: path.resolve(__dirname, 'src/assets/svg'),
        },
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/app-layout/AppLayout.tsx'),
      },
    },
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        path: `${__dirname}/src/intl`,
        languages: ['is', 'en'],
        defaultLanguage: 'is',
        redirect: false,
      },
    },
    'gatsby-plugin-netlify',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-67151291-1',
        respectDNT: true,
      }
    }
  ],
}
