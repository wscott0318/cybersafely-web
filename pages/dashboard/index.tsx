import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { withDashboardLayout } from '../../components/dashboard/layout'
import { useUser } from '../../utils/context/auth'

function Dashboard() {
  const router = useRouter()
  const { user } = useUser()

  useEffect(() => {
    if (user.isStaff) {
      router.replace('/dashboard/staff/home')
    } else if (user.membership?.isAdmin) {
      router.replace('/dashboard/admin/home')
    } else {
      router.replace('/dashboard/user/home')
    }
  }, [user])

  return null
}

export default withDashboardLayout(Dashboard, {
  title: 'Dashboard',
})
