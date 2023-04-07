import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { AthletesTable } from '../../../../components/shared/AthletesTable'
import { useSchoolRole } from '../../../../utils/context/auth'

function Athletes() {
  const schoolRole = useSchoolRole()

  return (
    <AthletesTable
      schoolId={schoolRole!.school.id}
      href={(memberId) => ({ pathname: '/dashboard/admin/members/[memberId]', query: { memberId } })}
    />
  )
}

export default withDashboardLayout(Athletes, {
  title: 'Athletes',
})
