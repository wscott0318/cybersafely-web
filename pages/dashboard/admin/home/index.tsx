import { withDashboardLayout } from '../../../../components/dashboard/Layout'

function Home() {
  return null
  // return <HomeStatsForCoach />
}

export default withDashboardLayout(Home, {
  title: 'Home',
  maxWidth: 'lg',
})
