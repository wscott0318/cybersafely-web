import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Alerts } from '../components/common/Alerts'
import { Config } from '../helpers/config'
import { ApolloClientProvider } from '../libs/apollo'
import createEmotionCache from '../utils/cache'
import { AlertContextProvider } from '../utils/context/alert'
import { theme } from '../utils/theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>{Config.appName}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AlertContextProvider>
          <Alerts />
          <ApolloClientProvider>
            <Component {...pageProps} />
          </ApolloClientProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
