import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Paper, Tab } from '@mui/material'
import { withDashboardLayout } from '../../../../components/dashboard/layout'

function Home() {
  return (
    <Paper>
      <TabContext value="1">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList>
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Paper>
  )
}

export default withDashboardLayout(Home, {
  title: 'Staff Dashboard',
})
