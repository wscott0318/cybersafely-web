import { Box, Container, Link, Stack, Typography } from '@mui/material'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Config } from '../../helpers/config'
import { useLogoUrl } from '../../helpers/hooks'

function Footer() {
  const logoUrl = useLogoUrl()

  return (
    <Box textAlign="center" bgcolor="background.paper" py={4} component="footer">
      <Container disableGutters>
        <Stack px={2} alignItems="center" textAlign="center">
          <NextImage alt="Logo" width={162} height={75} src={logoUrl} />
          <Typography>Super Cooper 19 LLC</Typography>
          <Typography>
            &copy; 2022 - {new Date().getFullYear()} {Config.app.name}
          </Typography>
          <Stack justifyContent="center" direction="row" flexWrap="wrap" gap={2} spacing={0}>
            <NextLink href="/privacy-policy" passHref legacyBehavior>
              <Link>Privacy Policy</Link>
            </NextLink>
            <NextLink href="/terms" passHref legacyBehavior>
              <Link>Terms</Link>
            </NextLink>
            <NextLink href="/how-it-works" passHref legacyBehavior>
              <Link>How It Works</Link>
            </NextLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
