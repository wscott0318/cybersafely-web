import { useMemo } from 'react'
import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { Section, UpdateUserForm } from '../../../components/forms/UpdateUserForm'
import { useUser } from '../../../utils/context/auth'

function Profile() {
  const { user, role, refetchUser } = useUser()

  const exclude = useMemo(() => {
    const values: Section[] = []

    if (role !== 'ATHLETE') {
      values.push('socials')
    }
    if (role !== 'COACH') {
      values.push('email-settings')
    }

    return values
  }, [role])

  return <UpdateUserForm userId={user.id} onChange={refetchUser} exclude={exclude} />
}

export default withDashboardLayout(Profile, {
  title: 'Profile',
  maxWidth: 'sm',
})
