import { alpha, Backdrop, Box, CircularProgress } from '@mui/material'
import NextImage from 'next/image'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'

export function LoadingLogo() {
  return (
    <Box position="relative" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress size={128} thickness={1.5} sx={{ opacity: 0.5 }} />
      <NextImage alt="Logo" src="/images/logo-loading.png" width={72} height={72} style={{ position: 'absolute' }} />
    </Box>
  )
}

export function NProgress() {
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
        backdropFilter: 'blur(10px)',
        zIndex: theme.zIndex.drawer + 10,
        background: alpha(theme.palette.background.paper, 0.5),
      })}
    >
      <LoadingLogo />
    </Backdrop>
  )
}
