import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateSchoolForm } from '../../../components/form/UpdateSchoolForm'
import { useSchoolRole } from '../../../utils/context/auth'

function School() {
  const schoolRole = useSchoolRole()

  if (!schoolRole || schoolRole.role === 'ATHLETE') {
    return null
  }

  return <UpdateSchoolForm school={schoolRole.school} />
}

export default withDashboardLayout(School, {
  title: 'School',
  maxWidth: 'sm',
})
