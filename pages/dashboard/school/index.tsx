import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateSchoolForm } from '../../../components/form/UpdateSchoolForm'
import { useSchoolQuery } from '../../../schema'
import { useSchoolRole } from '../../../utils/context/auth'

function School() {
  const schoolRole = useSchoolRole()

  const { data } = useSchoolQuery({ variables: { id: schoolRole!.school.id } })

  if (!data) {
    return null
  }

  return <UpdateSchoolForm school={data.school} />
}

export default withDashboardLayout(School, {
  title: 'School',
  maxWidth: 'sm',
})
