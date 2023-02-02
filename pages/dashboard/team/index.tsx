import { withDashboardLayout } from '../../../components/dashboard/Layout'
import { UpdateTeamForm } from '../../../components/form/UpdateTeamForm'
import { useTeamRole } from '../../../utils/context/auth'

function Team() {
  const teamRole = useTeamRole()

  if (!teamRole || teamRole.role === 'ATHLETE') {
    return null
  }

  return <UpdateTeamForm team={teamRole.team} />
}

export default withDashboardLayout(Team, {
  title: 'Team',
  maxWidth: 'sm',
})
