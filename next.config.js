const path = require('path')

const defaultImageDomains = [
  'cdn.pixabay.com',
  'lh3.googleusercontent.com',
  'www.pixsy.com',
  'placeimg.com',
]

const securityHeaders = [
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
]

/**@type {import('next').NextConfig} */
module.exports = {
  compiler: {
    styledComponents: true,
  },
  env: {
    rootPath: __dirname,
  },
  // assetPrefix: isProd ? '/path' : '',
  async headers() {
    return [
      {
        headers: securityHeaders,
        // apply these headers to all routes in your application.
        source: '/:path*',
      },
    ]
  },

  images: {
    domains: defaultImageDomains,
  },
  poweredByHeader: false,
  redirects() {
    return [
      {
        destination: '/external-organization',
        permanent: true,
        source: '/',
      },
    ]
  },
  serverRuntimeConfig: {},
  webpack(config) {
    // fix for trying load .md fire in middleware and boot
    config.module.noParse = /.md$/

    // // alias
    config.resolve.alias['~'] = path.resolve(__dirname, 'src')
    return config
  },
}
