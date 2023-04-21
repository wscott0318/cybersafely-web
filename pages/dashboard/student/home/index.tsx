import ChevronIcon from '@mui/icons-material/ArrowForwardOutlined'
import LinkIcon from '@mui/icons-material/LinkOutlined'
import { Box, Grid, Paper, Stack, Typography } from '@mui/material'
import { NextLink } from '../../../../components/common/NextLink'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { DashboardIntroText } from '../../../../components/shared/DashboardIntroText'

function Home() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <DashboardIntroText />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5" flexGrow={1}>
          Highlights
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <NextLink href="/dashboard/student/social">
          <Paper component="a" sx={{ p: 1, pr: 1.5, display: 'block', textDecoration: 'none' }}>
            <Stack direction="row" alignItems="center">
              <Box bgcolor="primary.main" borderRadius={1} color="white" p={1}>
                <LinkIcon color="inherit" sx={{ display: 'block' }} />
              </Box>
              <Typography flexGrow={1}>Setup Social Connections</Typography>
              <ChevronIcon color="disabled" />
            </Stack>
          </Paper>
        </NextLink>
      </Grid>
    </Grid>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
