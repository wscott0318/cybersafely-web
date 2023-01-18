import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useMemo } from 'react'
import { Alerts } from '../components/common/Alerts'
import { NProgress } from '../components/common/NProgress'
import { Config } from '../helpers/config'
import { ApolloClientProvider } from '../libs/apollo'
import createEmotionCache from '../utils/cache'
import { AlertContextProvider } from '../utils/context/alert'
import { createTheme } from '../utils/theme'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = useMemo(() => createTheme(isDark), [isDark])

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
            <NProgress />
          </ApolloClientProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
