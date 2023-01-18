import { alpha, Backdrop, CircularProgress, Stack, Typography } from '@mui/material'
import { Router } from 'next/router'
import { useEffect, useState } from 'react'

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
      <Stack alignItems="center">
        <CircularProgress />
        <Typography variant="body2">Loading Page</Typography>
      </Stack>
    </Backdrop>
  )
}
