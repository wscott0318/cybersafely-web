/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  // TODO: This can be removed in the future
  async redirects() {
    if (process.env.NODE_ENV === 'production') {
      return [
        {
          source: '/auth/:sub*',
          destination: '/',
          permanent: false
        },
        {
          source: '/dashboard/:sub*',
          destination: '/',
          permanent: false
        }
      ]
    }

    return []
  }
}

module.exports = nextConfig
