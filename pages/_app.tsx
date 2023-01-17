import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { Backdrop, CircularProgress, CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'
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

function NProgress() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleRouteStart = () => {
      setOpen(true)
    }
    const handleRouteDone = () => {
      setOpen(false)
    }

    Router.events.on('routeChangeStart', handleRouteStart)
    Router.events.on('routeChangeComplete', handleRouteDone)
    Router.events.on('routeChangeError', handleRouteDone)

    return () => {
      Router.events.off('routeChangeStart', handleRouteStart)
      Router.events.off('routeChangeComplete', handleRouteDone)
      Router.events.off('routeChangeError', handleRouteDone)
    }
  }, [])

  return (
    <Backdrop
      open={open}
      mountOnEnter
      unmountOnExit
      sx={(theme) => ({
        zIndex: theme.zIndex.drawer + 10,
        color: theme.palette.background.paper,
      })}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
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
            <NProgress />
          </ApolloClientProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
