import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { HomeStatsForAdminAndCoach } from '../../../../components/shared/HomeStatsForAdminAndCoach'

function Home() {
  return <HomeStatsForAdminAndCoach />
}

export default withDashboardLayout(Home, {
  title: 'Home',
  maxWidth: 'lg',
})
