import { WelcomeCard } from '../../../../components/common/WelcomeCard'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'

function Home() {
  return <WelcomeCard />
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
