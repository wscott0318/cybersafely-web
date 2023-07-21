import { Stack } from '@mui/material'
import { InfoCard } from '../../../../components/common/InfoCard'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { DashboardIntroText } from '../../../../components/shared/DashboardIntroText'
import { ParentChildrenTable } from '../../../../components/shared/ParentChildrenTable'
import { useUser } from '../../../../utils/context/auth'

function Home() {
  const { user } = useUser()

  return (
    <Stack>
      <DashboardIntroText />
      {!user.phoneNumber && (
        <InfoCard
          severity="info"
          message="Click the card to open your profile page"
          title="Add your Phone Number for faster and easier alerts"
          href={{ pathname: '/dashboard/profile', query: { index: '0' } }}
        />
      )}
      <ParentChildrenTable />
    </Stack>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
