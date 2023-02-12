import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { HomeStatsForCoach } from '../../../../components/shared/HomeStatsForCoach'

function Home() {
  return <HomeStatsForCoach />
}

export default withDashboardLayout(Home, {
  title: 'Home',
  maxWidth: 'lg',
})
