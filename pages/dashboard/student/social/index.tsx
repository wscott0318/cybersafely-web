import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Grid, Paper, Stack, Tab, Typography } from '@mui/material'
import { useState } from 'react'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { SocialButtonConfig } from '../../../../components/forms/UpdateUserForm'
import { useUser } from '../../../../utils/context/auth'

function Social() {
  const { user, refetchUser } = useUser()

  const [tab, setTab] = useState('facebook')

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Stack alignItems="center" justifyContent="center">
          <Typography variant="h5" fontWeight="bold">
            Social Networks
          </Typography>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <TabContext value={tab}>
          <Box>
            <TabList
              onChange={(_, _tab) => setTab(_tab)}
              sx={{
                '.MuiTabs-scroller': {
                  display: 'flex',
                  justifyContent: 'center',
                },
                '.MuiTabs-flexContainer': {
                  display: 'inline-flex',
                },
              }}
            >
              <Tab label="Facebook" value="facebook" />
              <Tab label="Twitter" value="twitter" />
              <Tab label="Instagram" value="instagram" />
              <Tab label="Tiktok" value="tiktok" />
            </TabList>
          </Box>
          <TabPanel value="facebook" sx={{ height: '500px', border: 'none' }}>
            <Stack sx={{ height: '500px', border: 'none', p: 2, alignItems: 'center' }}>
              <Paper sx={{ p: 4, maxWidth: '600px' }}>
                <Typography fontWeight="bold">Authorize CyberSafely to use your account?</Typography>
                <SocialButtonConfig name="FACEBOOK" user={user} refetch={refetchUser} />
                <Typography>This application will be able to:</Typography>
                <Typography>
                  • Read Tweets from your timeline. • See who you follow, and follow new people. • Update your profile.
                  • Post Tweets for you. Will not be able to: • Access your direct messages. • See your Twitter
                  password.
                </Typography>
              </Paper>
            </Stack>
          </TabPanel>
          <TabPanel value="twitter">
            <Stack sx={{ height: '500px', border: 'none', p: 2 }}>
              {/* <SocialButtonConfig name="TWITTER" user={user} refetch={refetchUser} /> */}
            </Stack>
          </TabPanel>
          <TabPanel value="instagram">
            <Stack sx={{ height: '500px', border: 'none', p: 2 }}>
              {/* <SocialButtonConfig name="INSTAGRAM" user={user} refetch={refetchUser} /> */}
            </Stack>
          </TabPanel>
          <TabPanel value="tiktok">
            <Stack sx={{ height: '500px', border: 'none', p: 2 }}>
              {/* <SocialButtonConfig name="TIKTOK" user={user} refetch={refetchUser} /> */}
            </Stack>
          </TabPanel>
        </TabContext>
      </Grid>
    </Grid>
  )
}

export default withDashboardLayout(Social, {
  title: 'Social',
})
