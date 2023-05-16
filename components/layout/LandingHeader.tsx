import CloseIcon from '@mui/icons-material/CloseOutlined'
import MenuIcon from '@mui/icons-material/MenuOutlined'
import { AppBar, Box, Button, Container, Drawer, IconButton, Stack, Toolbar, alpha } from '@mui/material'
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

function Menu() {
  const logoUrl = useLogoUrl()
  const { isMobile } = useMobile()

  const [open, setOpen] = useState(false)

  if (isMobile) {
    return (
      <>
        <IconButton onClick={() => setOpen(true)} color="primary" size="large">
          <MenuIcon fontSize="large" />
        </IconButton>
        <Drawer
          open={open}
          anchor="right"
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              p: 2,
              width: '100vw',
              border: 'none',
            },
          }}
        >
          <Stack>
            <IconButton onClick={() => setOpen(false)} sx={{ alignSelf: 'flex-end' }}>
              <CloseIcon />
            </IconButton>
            <NextImage alt="Logo" src={logoUrl} height={75} width={162} style={{ alignSelf: 'center' }} />
            <Button color="inherit" variant="text" size="large" href="/resources">
              Resources
            </Button>
            <Button color="inherit" variant="text" size="large" href="/why">
              WHY CYBERSAFELY.ai
            </Button>
            {/* TODO: This can be removed in the future */}
            {Config.enableLogin && <LoginButton />}
          </Stack>
        </Drawer>
      </>
    )
  }

  return (
    <>
      <Button color="inherit" variant="text" size="large" href="/resources">
        Resources
      </Button>
      <Button color="inherit" variant="text" size="large" href="/why">
        WHY CYBERSAFELY.ai
      </Button>
      {/* TODO: This can be removed in the future */}
      {Config.enableLogin && (
        <Box pl={1}>
          <LoginButton />
        </Box>
      )}
    </>
  )
}

function Header() {
  const logoUrl = useLogoUrl()
  const { isOnTop } = useOnTop(50)

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
            <Menu />
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
