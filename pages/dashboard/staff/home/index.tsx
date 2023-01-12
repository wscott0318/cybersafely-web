import { withDashboardLayout } from '../../../../components/dashboard/layout'
import { useUser } from '../../../../utils/context/auth'

function Home() {
  const { user } = useUser()

  return <p>Hello, {user.name}!</p>
}

export default withDashboardLayout(Home, {
  title: 'Home',
  level: 'staff',
})
