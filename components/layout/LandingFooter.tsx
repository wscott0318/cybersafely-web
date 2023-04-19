import { Box, Container, Stack, Typography } from '@mui/material'
import NextImage from 'next/image'
import { Config } from '../../helpers/config'
import { useLogoUrl } from '../../helpers/hooks'

function Footer() {
  const logoUrl = useLogoUrl()

  return (
    <Box textAlign="center" bgcolor="background.paper" py={4} component="footer">
      <Container disableGutters>
        <Stack px={2} alignItems="center" textAlign="center">
          <NextImage alt="Logo" width={162} height={75} src={logoUrl} />
          <Typography>
            &copy; 2022 - {new Date().getFullYear()} {Config.app.name}
          </Typography>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer
