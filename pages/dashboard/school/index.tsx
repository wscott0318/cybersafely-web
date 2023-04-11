import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateSchoolForm } from '../../../components/forms/UpdateSchoolForm'
import { useSchoolRole } from '../../../utils/context/auth'

function School() {
  const schoolRole = useSchoolRole()

  if (schoolRole && schoolRole.type !== 'STUDENT') {
    return <UpdateSchoolForm schoolId={schoolRole.school.id} />
  }

  return null
}

export default withDashboardLayout(School, {
  title: 'School',
  maxWidth: 'sm',
})
