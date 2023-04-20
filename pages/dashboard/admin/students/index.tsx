import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { StudentsTable } from '../../../../components/shared/StudentsTable'
import { useSchoolRole } from '../../../../utils/context/auth'

function Students() {
  const schoolRole = useSchoolRole()

  return (
    <StudentsTable
      schoolId={schoolRole!.school.id}
      href={(memberId) => ({ pathname: '/dashboard/admin/members/[memberId]', query: { memberId } })}
    />
  )
}

export default withDashboardLayout(Students, {
  title: 'Students',
})
