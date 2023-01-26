import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Paper, Tab } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdatePasswordForm } from '../../../components/form/UpdatePasswordForm'
import { UpdateProfileForm } from '../../../components/form/UpdateProfileForm'

function Profile() {
  const [tab, setTab] = useState('profile')

  return (
    <Paper>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, tab) => setTab(tab)}>
            <Tab label="Profile" value="profile" />
            <Tab label="Password" value="password" />
          </TabList>
        </Box>
        <TabPanel value="profile">
          <UpdateProfileForm />
        </TabPanel>
        <TabPanel value="password">
          <UpdatePasswordForm />
        </TabPanel>
      </TabContext>
    </Paper>
  )
}

export default withDashboardLayout(Profile, {
  title: 'Profile',
  maxWidth: 'sm',
})
