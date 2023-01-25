export const Config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/graphql',
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? 'CyberSafely.ai – Social Media Pivot',
  email: {
    support: process.env.NEXT_PUBLIC_EMAIL_SUPPORT ?? 'contact@cybersafely.ai',
  },
}
