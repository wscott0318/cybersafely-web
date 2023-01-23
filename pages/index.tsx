import { AppBar, Box, Button, Container, Stack, Toolbar, Typography, useMediaQuery } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Config } from '../helpers/config'

function useLogoUrl() {
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')

  return useMemo(() => {
    return isDark ? '/images/logo-white.png' : '/images/logo-black.png'
  }, [isDark])
}

function useOnTop() {
  const [onTop, setOnTop] = useState(true)

  useEffect(() => {
    function onScroll() {
      setOnTop(window.scrollY === 0)
    }

    window.addEventListener('scroll', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return { onTop }
}

function Header() {
  const { onTop } = useOnTop()

  const logoUrl = useLogoUrl()

  return (
    <AppBar
      sx={(theme) => ({
        transition: 'all 0.25s linear',
        color: theme.palette.text.primary,
        background: onTop ? 'transparent' : theme.palette.background.paper,
      })}
    >
      <Toolbar disableGutters>
        <Container disableGutters>
          <Stack alignItems="center" direction="row" mx={2} my={2}>
            <NextLink href="/">
              <NextImage alt="Logo" width={108} height={50} src={logoUrl} />
            </NextLink>
            <Box flexGrow={1} />
            <Button color="inherit" variant="text" size="large" href="#">
              Home
            </Button>
            <Button color="inherit" variant="text" size="large" href="#mission">
              Mission
            </Button>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

function Hero() {
  const logoUrl = useLogoUrl()

  return (
    <Box position="relative">
      <NextImage
        fill
        alt="Hero"
        src="/images/landing/hero.jpg"
        style={{
          zIndex: -1,
          opacity: 0.3,
          objectFit: 'cover',
        }}
      />
      <Box minHeight="100vh" display="flex" alignItems="center">
        <Container disableGutters>
          <Stack alignItems="center" textAlign="center" spacing={8} mx={2} my={16}>
            <Typography variant="h3">Coming Soon!</Typography>
            <NextImage alt="Logo" width={540} height={250} src={logoUrl} />
            <Typography variant="h5">
              A tool to help schools educate students on how to pivot negative behavior online
            </Typography>
            <Button size="large" href="#mission">
              Learn More
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}

function Mission() {
  return (
    <Container id="mission" disableGutters>
      <Stack mx={2} my={16} alignItems="center" textAlign="center">
        <Typography variant="h4">Our Mission</Typography>
        <Typography variant="h6">
          We are dedicated to support today’s youth by identifying and educating them on how their future can be
          affected by their behavior on social media. Our mission is designed to help them protect their future success
          by addressing critical societal issues such as bullying, sexual content, suicide and the illegal use of
          weapons.
        </Typography>
      </Stack>
    </Container>
  )
}

function Footer() {
  const logoUrl = useLogoUrl()

  return (
    <Box textAlign="center" bgcolor="background.paper" py={4}>
      <Container disableGutters>
        <Stack mx={2} alignItems="center" textAlign="center">
          <NextImage alt="Logo" width={216} height={100} src={logoUrl} />
          <Typography>
            &copy; 2022 - {new Date().getFullYear()} {Config.appName}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default function Landing() {
  return (
    <Box>
      <Header />
      <Hero />
      <Mission />
      <Footer />
    </Box>
  )
}
