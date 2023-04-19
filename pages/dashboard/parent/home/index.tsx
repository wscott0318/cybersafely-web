import { Stack } from '@mui/material'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { DashboardIntroText } from '../../../../components/shared/DashboardIntroText'
import { ParentChildrenTable } from '../../../../components/shared/ParentChildrenTable'

function Home() {
  return (
    <Stack>
      <DashboardIntroText />
      <ParentChildrenTable />
    </Stack>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
