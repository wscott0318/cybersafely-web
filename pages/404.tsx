import { Box, Button, Divider, Link, Stack, Typography } from '@mui/material'
import { CoverLayout } from '../components/common/CoverLayout'
import { NextLink } from '../components/common/NextLink'
import { Config } from '../helpers/config'

export default function My404() {
  return (
    <CoverLayout>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4">404 Page not found!</Typography>
          <Typography>Oppps, The page you’re looking for doesn’t exist.</Typography>
        </Box>
        <NextLink href="/">
          <Button size="large">Back Home</Button>
        </NextLink>
        <Divider />
        <Typography>
          Something wrong? <Link href={'mailto:' + Config.email.support}>Report an issue</Link>
        </Typography>
      </Stack>
    </CoverLayout>
  )
}
