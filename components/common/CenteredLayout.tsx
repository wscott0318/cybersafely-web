import { Box, Paper } from '@mui/material'

type CenteredLayoutProps = {
  children: React.ReactNode
}

export function CenteredLayout(props: CenteredLayoutProps) {
  return (
    <Box p={3} minHeight="100vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Paper sx={{ p: 3, width: '100%', maxWidth: 350 }}>{props.children}</Paper>
    </Box>
  )
}
