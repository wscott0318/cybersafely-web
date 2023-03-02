import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateUserForm } from '../../../components/forms/UpdateUserForm'
import { useUser } from '../../../utils/context/auth'

function Profile() {
  const { user, refetchUser } = useUser()

  return <UpdateUserForm userId={user.id} onChange={refetchUser} />
}

export default withDashboardLayout(Profile, {
  title: 'Profile',
  maxWidth: 'sm',
})
