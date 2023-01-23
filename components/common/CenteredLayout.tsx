import { Box, Paper, Typography } from '@mui/material'

import NextImage from 'next/image'
import { Config } from '../../helpers/config'
import { useLogoUrl } from '../../helpers/hooks'

type CenteredLayoutProps = {
  children: React.ReactNode
}

export function CenteredLayout(props: CenteredLayoutProps) {
  const logoUrl = useLogoUrl()

  return (
    <Box p={3} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Paper sx={{ p: 4, width: '100%', maxWidth: 380 }}>
        <NextImage alt="Logo" width={162} height={75} src={logoUrl} />
        <Box mt={2}>{props.children}</Box>
      </Paper>
      <Typography variant="body2" my={2} color="text.disabled">
        &copy; 2022 - {new Date().getFullYear()} {Config.appName}
      </Typography>
    </Box>
  )
}
