import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateUserForm } from '../../../components/forms/UpdateUserForm'
import { useUser } from '../../../utils/context/auth'

function Profile() {
  const { user, role, refetchUser } = useUser()

  return (
    <UpdateUserForm userId={user.id} onChange={refetchUser} exclude={role !== 'ATHLETE' ? ['socials'] : undefined} />
  )
}

export default withDashboardLayout(Profile, {
  title: 'Profile',
  maxWidth: 'sm',
})
