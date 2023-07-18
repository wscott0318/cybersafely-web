export const Config = {
  demo: process.env.NEXT_PUBLIC_ENVIRONMENT === 'demo',
  enableLogin: process.env.NEXT_PUBLIC_ENABLE_LOGIN === 'true',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql',
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? 'CyberSafely.ai – Social Media Pivot',
    shortName: process.env.NEXT_PUBLIC_APP_SHORT_NAME ?? 'CyberSafely.ai',
  },
  email: {
    support: process.env.NEXT_PUBLIC_EMAIL_SUPPORT ?? 'annettef@cybersafely.ai',
  },
  intercom: {
    appId: process.env.NEXT_PUBLIC_INTERCOM_APP_ID,
  },
}
