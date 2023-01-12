import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { withDashboardLayout } from '../../components/dashboard/layout'
import { useUser } from '../../utils/context/auth'

function Dashboard() {
  const router = useRouter()
  const { user, membership } = useUser()

  useEffect(() => {
    if (user.isStaff) {
      router.replace('/dashboard/staff/home')
    } else if (membership?.isAdmin) {
      router.replace('/dashboard/coach/home')
    } else if (membership) {
      router.replace('/dashboard/athlete/home')
    } else if (user.children.length > 0) {
      router.replace('/dashboard/parent/home')
    } else {
      throw new Error('Cannot redirect user')
    }
  }, [])

  return null
}

export default withDashboardLayout(Dashboard, {
  title: 'Dashboard',
})
