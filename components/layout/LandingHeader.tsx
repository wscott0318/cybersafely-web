import { AppBar, Box, Button, Container, Stack, Toolbar, alpha } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { Config } from '../../helpers/config'
import { useLogoUrl, useMobile, useOnTop } from '../../helpers/hooks'
import { StorageManager } from '../../utils/storage'

export const TOOLBAR_HEIGHT = 88.5

function LoginButton() {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (!!StorageManager.get('token')) {
      setLoggedIn(true)
    }
  }, [])

  if (loggedIn) {
    return (
      <NextLink href="/dashboard" passHref legacyBehavior>
        <Button size="large">Dashboard</Button>
      </NextLink>
    )
  }

  return (
    <NextLink href="/auth/login" passHref legacyBehavior>
      <Button size="large">Login</Button>
    </NextLink>
  )
}

function Header() {
  const logoUrl = useLogoUrl()
  const { isOnTop } = useOnTop(50)
  const { isMobile } = useMobile()

  return (
    <AppBar
      variant="elevation"
      elevation={isOnTop ? 0 : 2}
      sx={(theme) => ({
        transition: 'all 0.25s linear',
        color: theme.palette.text.primary,
        backdropFilter: isOnTop ? undefined : 'blur(10px)',
        background: isOnTop ? 'transparent' : alpha(theme.palette.background.paper, 0.95),
      })}
    >
      <Toolbar disableGutters>
        <Container disableGutters>
          <Stack spacing={1} alignItems="center" direction="row" px={2} py={2}>
            <NextLink href="/">
              <NextImage
                alt="Logo"
                src={logoUrl}
                height={isOnTop ? 75 : 50}
                width={isOnTop ? 162 : 108}
                style={{ transition: 'all 0.25s linear' }}
              />
            </NextLink>
            <Box flexGrow={1} />
            {!isMobile && (
              <Button color="inherit" variant="text" size="large" href="/why">
                WHY CYBERSAFELY.ai
              </Button>
            )}
            {/* TODO: This can be removed in the future */}
            {Config.enableLogin && (
              <Box pl={1}>
                <LoginButton />
              </Box>
            )}
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
