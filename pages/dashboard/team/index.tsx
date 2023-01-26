import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Paper, Tab } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateTeamForm } from '../../../components/form/UpdateTeamForm'

function Team() {
  const [tab, setTab] = useState('team')

  return (
    <Paper>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={(_, tab) => setTab(tab)}>
            <Tab label="Team" value="team" />
          </TabList>
        </Box>
        <TabPanel value="team">
          <UpdateTeamForm />
        </TabPanel>
      </TabContext>
    </Paper>
  )
}

export default withDashboardLayout(Team, {
  title: 'Team',
  maxWidth: 'sm',
})
