import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import NextImage from 'next/image'
import { NextLink } from '../components/common/NextLink'
import { Config } from '../helpers/config'
import { useLogoUrl } from '../helpers/hooks'

export default function My500() {
  const logoUrl = useLogoUrl()

  return (
    <Stack p={4} flexDirection="column" minHeight="100vh">
      <NextLink href="/">
        <NextImage alt="Logo" src={logoUrl} height={75} width={162} />
      </NextLink>
      <Box flexGrow={1} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Stack spacing={4} width="100%" maxWidth={400} alignItems="center">
          <Box>
            <Typography variant="h4">500 Server Error!</Typography>
            <Typography>Oppps, something went wrong.</Typography>
          </Box>
          <NextLink href="/">
            <Button size="large">Back Home</Button>
          </NextLink>
          <Divider sx={{ alignSelf: 'stretch' }} />
          <Typography>
            Something wrong? <Link href={'mailto:' + Config.email.support}>Report an issue</Link>
          </Typography>
        </Stack>
      </Box>
    </Stack>
  )
}
