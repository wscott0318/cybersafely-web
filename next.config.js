const withRoutes = require('nextjs-routes/config')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TODO: This can be removed in the future
  async redirects() {
    if (process.env.NEXT_PUBLIC_ENABLE_LOGIN !== 'true') {
      return [
        {
          source: '/auth/:sub*',
          destination: '/',
          permanent: false,
        },
        {
          source: '/dashboard/:sub*',
          destination: '/',
          permanent: false,
        },
      ]
    }

    return []
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = withRoutes(nextConfig)
